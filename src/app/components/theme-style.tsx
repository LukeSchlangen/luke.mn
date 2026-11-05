import { Theme } from "../types";
import colorValues from "../utils/color-values";

export default function ThemeStyle({ theme }: { theme: Theme }) {
  const { bodyBackgroundColor } = colorValues(theme);

  return (
    <style>{`:root { color-scheme: ${theme.color}; } body { background-color: ${bodyBackgroundColor}; }`}</style>
  );
}
