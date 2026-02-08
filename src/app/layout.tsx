import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luke Schlangen",
  description: "Software Engineer Portfolio",
  icons: {
    icon: "/favicons/smiling-face.svg",
  },
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
