import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luke Schlangen",
  description:
    "Developer Advocate at Google and Co-Founder of Code Championship.",
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
