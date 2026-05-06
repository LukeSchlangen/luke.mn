import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luke Schlangen | Software Engineer",
  description:
    "Luke Schlangen's personal website. Software engineer, educator, and lifelong learner.",
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
