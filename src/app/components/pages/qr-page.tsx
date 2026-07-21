"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { DeploymentConfiguration, Theme } from "../../types";
import colorValues from "../../utils/color-values";
import Footer from "../footer";
import Navbar from "../navbar";

export default function QRPageClient({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  // Color values for current website theme
  const { textColorClass, bodyBackgroundColor, textBackgroundColorClass } =
    colorValues(theme);

  // QR Code generator state
  const [text, setText] = useState("https://lukeschlangen.com");
  const [version, setVersion] = useState<number | "auto">("auto");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<
    "L" | "M" | "Q" | "H"
  >("M");
  const [maskPattern, setMaskPattern] = useState<number | "auto">("auto");
  const [margin, setMargin] = useState(4);
  const [scale, setScale] = useState(4);
  const [width, setWidth] = useState<number | "">("");

  // Colors
  const [darkColor, setDarkColor] = useState("#000000");
  const [darkOpacity, setDarkOpacity] = useState(100);
  const [lightColor, setLightColor] = useState("#ffffff");
  const [lightOpacity, setLightOpacity] = useState(100);

  // Output format & generated results
  const [outputFormat, setOutputFormat] = useState<
    "png" | "jpeg" | "webp" | "svg"
  >("png");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [qrSvgString, setQrSvgString] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Refs for preview rendering
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Convert color hex + opacity to RGBA hex string expected by qrcode library
  const toRgbaHex = (hex: string, opacityPercent: number) => {
    const alpha = Math.round((opacityPercent / 100) * 255)
      .toString(16)
      .padStart(2, "0");
    return `${hex}${alpha}`;
  };

  useEffect(() => {
    const generateQRCode = async () => {
      setError(null);
      try {
        const darkRgba = toRgbaHex(darkColor, darkOpacity);
        const lightRgba = toRgbaHex(lightColor, lightOpacity);

        const options: any = {
          errorCorrectionLevel,
          margin: Number(margin),
          scale: Number(scale),
          color: {
            dark: darkRgba,
            light: lightRgba,
          },
        };

        if (version !== "auto") {
          options.version = Number(version);
        }
        if (maskPattern !== "auto") {
          options.maskPattern = Number(maskPattern);
        }
        if (width !== "") {
          options.width = Number(width);
        }

        // 1. Generate PNG/JPEG/WEBP Data URL
        let type: "image/png" | "image/jpeg" | "image/webp" = "image/png";
        if (outputFormat === "jpeg") type = "image/jpeg";
        if (outputFormat === "webp") type = "image/webp";

        const dataUrlOpts: any = {
          ...options,
          type,
          rendererOpts: {
            quality: 0.92,
          },
        };

        // Standard toDataURL
        const url = await (QRCode.toDataURL(
          text,
          dataUrlOpts,
        ) as unknown as Promise<string>);
        setQrDataUrl(url);

        // 2. Generate SVG String
        const svgStr = await (QRCode.toString(text, {
          ...options,
          type: "svg",
        } as any) as unknown as Promise<string>);
        setQrSvgString(svgStr);

        // 3. Render on canvas if present
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, text, options);
        }
      } catch (err: any) {
        console.error("QR Code Generation Error:", err);
        setError(
          err?.message ||
            "Failed to generate QR Code. Please check your options.",
        );
      }
    };

    generateQRCode();
  }, [
    text,
    version,
    errorCorrectionLevel,
    maskPattern,
    margin,
    scale,
    width,
    darkColor,
    darkOpacity,
    lightColor,
    lightOpacity,
    outputFormat,
  ]);

  const handleDownload = () => {
    if (error) return;

    const link = document.createElement("a");
    if (outputFormat === "svg") {
      const blob = new Blob([qrSvgString], { type: "image/svg+xml" });
      link.href = URL.createObjectURL(blob);
      link.download = `qrcode.svg`;
    } else {
      link.href = qrDataUrl;
      link.download = `qrcode.${outputFormat}`;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      alert(`${type} copied to clipboard!`);
    } catch (err) {
      alert("Failed to copy text.");
    }
  };

  // Helper classes to dynamically style inputs for perfect accessibility on dark/light themes
  const inputThemeClass =
    theme.color === "dark"
      ? "bg-gray-900 text-white border-gray-700 focus:ring-blue-400 placeholder-gray-500"
      : "bg-white text-black border-gray-300 focus:ring-blue-500 placeholder-gray-400";

  return (
    <div
      className={`w-full min-h-screen ${textColorClass} transition-colors duration-300 pb-12`}
    >
      <style>{`body { background-color: ${bodyBackgroundColor} }`}</style>

      <Navbar theme={theme} deploymentConfiguration={deploymentConfiguration} />

      <div className="m-auto max-w-5xl px-4 mt-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
            QR Code Generator
          </h1>
          <p className="text-lg opacity-75">
            Generate a highly customizable QR Code entirely client-side.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Options Panel (Left) */}
          <div
            className={`lg:col-span-7 rounded-2xl p-6 drop-shadow-xl ${textBackgroundColorClass} space-y-6 border border-gray-200/10`}
          >
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="qr-text"
              >
                Content / URL
              </label>
              <textarea
                id="qr-text"
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text, URL, contact details or any other content to encode..."
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 resize-y ${inputThemeClass}`}
              />
            </div>

            {/* Config options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="qr-version"
                >
                  Version (Size)
                </label>
                <select
                  id="qr-version"
                  value={version}
                  onChange={(e) =>
                    setVersion(
                      e.target.value === "auto"
                        ? "auto"
                        : Number(e.target.value),
                    )
                  }
                  className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${inputThemeClass}`}
                >
                  <option value="auto">Auto (Calculated)</option>
                  {Array.from({ length: 40 }, (_, i) => i + 1).map((v) => (
                    <option key={v} value={v}>
                      Version {v} ({v * 4 + 17}x{v * 4 + 17} modules)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="qr-ecl"
                >
                  Error Correction Level
                </label>
                <select
                  id="qr-ecl"
                  value={errorCorrectionLevel}
                  onChange={(e) =>
                    setErrorCorrectionLevel(e.target.value as any)
                  }
                  className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${inputThemeClass}`}
                >
                  <option value="L">L (Low ~7% recovery)</option>
                  <option value="M">M (Medium ~15% recovery)</option>
                  <option value="Q">Q (Quartile ~25% recovery)</option>
                  <option value="H">H (High ~30% recovery)</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="qr-mask"
                >
                  Mask Pattern
                </label>
                <select
                  id="qr-mask"
                  value={maskPattern}
                  onChange={(e) =>
                    setMaskPattern(
                      e.target.value === "auto"
                        ? "auto"
                        : Number(e.target.value),
                    )
                  }
                  className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${inputThemeClass}`}
                >
                  <option value="auto">Auto (Calculated)</option>
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((p) => (
                    <option key={p} value={p}>
                      Pattern {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="qr-margin"
                >
                  Margin (Quiet Zone)
                </label>
                <input
                  id="qr-margin"
                  type="number"
                  min={0}
                  value={margin}
                  onChange={(e) =>
                    setMargin(Math.max(0, Number(e.target.value)))
                  }
                  className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${inputThemeClass}`}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="qr-scale"
                >
                  Scale Factor
                </label>
                <input
                  id="qr-scale"
                  type="number"
                  min={1}
                  value={scale}
                  onChange={(e) =>
                    setScale(Math.max(1, Number(e.target.value)))
                  }
                  className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${inputThemeClass}`}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="qr-width"
                >
                  Width (Forced, px)
                </label>
                <input
                  id="qr-width"
                  type="number"
                  min={1}
                  placeholder="Auto (Scale based)"
                  value={width}
                  onChange={(e) =>
                    setWidth(
                      e.target.value === ""
                        ? ""
                        : Math.max(1, Number(e.target.value)),
                    )
                  }
                  className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 ${inputThemeClass}`}
                />
              </div>
            </div>

            {/* Colors setup */}
            <div className="border-t border-gray-200/10 pt-4">
              <h3 className="text-sm font-bold mb-4">Design Colors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Dark color selector */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold">
                      Dark Modules (Foreground)
                    </span>
                    <span className="text-xs font-mono opacity-60">
                      {darkColor} ({darkOpacity}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border-0 p-0"
                    />
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase tracking-wider opacity-60 mb-1">
                        Opacity
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={darkOpacity}
                        onChange={(e) => setDarkOpacity(Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Light color selector */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold">
                      Light Modules (Background)
                    </span>
                    <span className="text-xs font-mono opacity-60">
                      {lightColor} ({lightOpacity}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border-0 p-0"
                    />
                    <div className="flex-1">
                      <label className="block text-[10px] uppercase tracking-wider opacity-60 mb-1">
                        Opacity
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={lightOpacity}
                        onChange={(e) =>
                          setLightOpacity(Number(e.target.value))
                        }
                        className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Preview & Download (Right) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div
              className={`rounded-2xl p-6 drop-shadow-xl ${textBackgroundColorClass} border border-gray-200/10 text-center flex flex-col items-center justify-center min-h-[350px] relative`}
            >
              <h2 className="text-lg font-bold mb-4 self-start">
                Interactive Preview
              </h2>

              {error ? (
                <div className="bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl p-4 text-sm font-medium my-auto max-w-xs">
                  ⚠️ {error}
                </div>
              ) : (
                <div className="my-auto flex flex-col items-center gap-4">
                  {/* SVG Renderer or Image Renderer based on format choice */}
                  {outputFormat === "svg" ? (
                    <div
                      className="max-w-[280px] w-full h-auto p-2 bg-white rounded-lg shadow-inner flex items-center justify-center [&>svg]:w-full [&>svg]:h-auto"
                      dangerouslySetInnerHTML={{ __html: qrSvgString }}
                    />
                  ) : (
                    qrDataUrl && (
                      <div className="p-2 bg-white rounded-lg shadow-inner flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={qrDataUrl}
                          alt="Generated QR Code"
                          className="max-w-[280px] h-auto object-contain"
                        />
                      </div>
                    )
                  )}

                  <span className="text-xs opacity-60">
                    Format: {outputFormat.toUpperCase()} (
                    {version === "auto" ? "Auto" : `Version ${version}`})
                  </span>
                </div>
              )}

              {/* Invisible canvas used for rendering/calculations in background */}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Download and Share Options */}
            {!error && (
              <div
                className={`rounded-2xl p-6 drop-shadow-xl ${textBackgroundColorClass} border border-gray-200/10 space-y-4`}
              >
                <h2 className="text-lg font-bold">Actions & Output</h2>

                <div>
                  <label className="block text-xs font-semibold opacity-75 mb-2">
                    Export Format
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(["png", "jpeg", "webp", "svg"] as const).map((fmt) => {
                      const isSelected = outputFormat === fmt;
                      const baseBtnClass =
                        "py-1.5 px-3 rounded-lg text-xs font-bold transition";
                      const activeClass = "bg-blue-600 text-white";
                      const inactiveClass =
                        theme.color === "dark"
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200";

                      return (
                        <button
                          key={fmt}
                          onClick={() => setOutputFormat(fmt)}
                          className={`${baseBtnClass} ${isSelected ? activeClass : inactiveClass}`}
                        >
                          {fmt.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={handleDownload}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl text-sm font-bold shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    📥 Download QR
                  </button>

                  <button
                    onClick={() => {
                      if (outputFormat === "svg") {
                        copyToClipboard(qrSvgString, "SVG String");
                      } else {
                        copyToClipboard(qrDataUrl, "Data URL");
                      }
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      theme.color === "dark"
                        ? "bg-gray-800 text-white hover:bg-gray-700"
                        : "bg-gray-200 text-black hover:bg-gray-300"
                    }`}
                  >
                    📋 Copy {outputFormat === "svg" ? "SVG" : "Data URL"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
