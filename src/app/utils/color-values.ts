import { Theme } from "../types";

const bodyBackgroundColorSelector = (theme: Theme): string => {
  if (theme.vibe === "fun") return "rgb(233,210,106)";
  if (theme.vibe === "standard") return "rgb(252,200,63)";
  if (theme.color === "light") return "rgb(249,249,249)";
  return "rgb(61,61,60)";
};

export default function colorValues(theme: Theme) {
  const isLight = theme.color === "light";
  return {
    bodyBackgroundColor: bodyBackgroundColorSelector(theme),
    textBackgroundColor: isLight ? "#ffffff" : "#000000",
    textBackgroundColorClass: isLight ? "bg-gray-50" : "bg-gray-950",
    textColor: isLight ? "#000000" : "#ffffff",
    textColorClass: isLight ? "text-gray-900" : "text-gray-100",
  };
}
