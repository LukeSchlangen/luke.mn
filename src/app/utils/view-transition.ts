let pendingTransitionResolve: (() => void) | null = null;
let fallbackTimeoutId: ReturnType<typeof setTimeout> | null = null;

export function notifyViewTransitionReady() {
  if (fallbackTimeoutId !== null) {
    clearTimeout(fallbackTimeoutId);
    fallbackTimeoutId = null;
  }
  if (pendingTransitionResolve) {
    pendingTransitionResolve();
    pendingTransitionResolve = null;
  }
}

export function triggerViewTransition(
  updateAction: () => void,
  fallbackMs: number = 1500,
) {
  if (typeof document === "undefined" || !("startViewTransition" in document)) {
    updateAction();
    return;
  }

  // Clear any existing transition resolve
  notifyViewTransitionReady();

  // @ts-ignore - Document.startViewTransition is native in modern browsers
  document.startViewTransition(() => {
    return new Promise<void>((resolve) => {
      let settled = false;
      const finish = () => {
        if (!settled) {
          settled = true;
          resolve();
        }
      };

      pendingTransitionResolve = finish;
      updateAction();

      fallbackTimeoutId = setTimeout(() => {
        fallbackTimeoutId = null;
        finish();
      }, fallbackMs);
    });
  });
}
