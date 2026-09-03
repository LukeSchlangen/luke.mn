import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luke Schlangen | Developer Advocate",
  description:
    "Luke Schlangen's personal website. Developer Advocate at Google with a focus on builders, helping people turn ideas into real, helpful tools with Google AI Studio, Firebase, and Cloud Run.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
