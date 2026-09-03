import Link from "next/link";

export default function TheAgentFactory() {
  return (
    <Link
      href="https://www.youtube.com/playlist?list=PLIivdWyY5sqLXR1eSkiM5bE6pFlXC-OSs"
      className="underline decoration-blue-400 hover:decoration-blue-600"
    >
      <em>The Agent Factory</em>
    </Link>
  );
}
