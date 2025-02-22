import Link from "next/link";
import { Jost } from "next/font/google";

const jost = Jost({
  weight: "400",
  subsets: ["latin"],
});

export default function DeveloperAdvocateAtGoogle() {
  return (
    <Link
      href="https://developers.google.com/profile/u/lukeschlangen"
      className="underline decoration-blue-400 hover:decoration-blue-600"
    >
      developer advocate at{" "}
      <span className={jost.className}>
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#DB4437" }}>o</span>
        <span style={{ color: "#F4B400" }}>o</span>
        <span style={{ color: "#4285F4" }}>g</span>
        <span style={{ color: "#0F9D58" }}>l</span>
        <span style={{ color: "#DB4437" }}>e</span>
      </span>
    </Link>
  );
}
