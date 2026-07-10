import { Metadata } from "next";
import QRPageClient from "../components/pages/qr-page";

export const metadata: Metadata = {
  title: "QR Code Generator | Luke Schlangen",
  description: "A fully customizable, client-side QR Code generator.",
};

export default function Page() {
  return <QRPageClient />;
}
