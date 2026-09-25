"use client";

import { useEffect, useRef, useState } from "react";

interface PretextMetricsProps {
  text: string;
  font?: string;
  fontSize?: number;
  badgeStyle?: "amber" | "indigo" | "blue";
  className?: string;
}

export default function PretextMetrics({
  text,
  font = "14px system-ui, -apple-system, sans-serif",
  fontSize = 14,
  badgeStyle = "amber",
  className = "",
}: PretextMetricsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [metrics, setMetrics] = useState<{
    lineCount: number;
    estimatedReadTime: number;
  } | null>(null);

  useEffect(() => {
    let active = true;

    const measureText = async () => {
      const container = containerRef.current;
      if (!container || !text.trim()) return;

      const containerWidth =
        container.parentElement?.clientWidth || container.clientWidth;
      if (containerWidth <= 0) return;

      try {
        const pretext = await import("@chenglou/pretext");
        if (!active) return;

        const lineHeight = fontSize * 1.5;
        const prepared = pretext.prepare(text, font);
        const layoutResult = pretext.layout(prepared, containerWidth, lineHeight);

        const calculatedLines = Math.max(
          1,
          Math.round(layoutResult.height / lineHeight),
        );
        const words = text.trim().split(/\s+/).length;
        const calculatedReadTime = Math.max(2, Math.ceil((words / 200) * 60));

        setMetrics({
          lineCount: calculatedLines,
          estimatedReadTime: calculatedReadTime,
        });
      } catch (e) {
        const words = text.trim().split(/\s+/).length;
        setMetrics({
          lineCount: Math.ceil(words / 12),
          estimatedReadTime: Math.max(2, Math.ceil((words / 200) * 60)),
        });
      }
    };

    measureText();

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      measureText();
    });
    observer.observe(container.parentElement || container);

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [text, font, fontSize]);

  const colorClasses =
    badgeStyle === "indigo"
      ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
      : badgeStyle === "blue"
        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
        : "bg-amber-500/10 text-amber-500 border-amber-500/20";

  return (
    <div ref={containerRef} className={`inline-flex items-center ${className}`}>
      {metrics && (
        <span
          className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-mono border ${colorClasses}`}
        >
          <span>
            {metrics.lineCount} {metrics.lineCount === 1 ? "line" : "lines"}
          </span>
          <span className="opacity-40">•</span>
          <span>~{metrics.estimatedReadTime}s read</span>
        </span>
      )}
    </div>
  );
}
