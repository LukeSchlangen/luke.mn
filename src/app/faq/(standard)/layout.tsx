export const metadata = {
  title: "Luke Schlangen",
  description:
    "I am a developer advocate at Google. I am a co-founder of Code Championship. I believe learning follows excitement.",
  icons: {
    icon: "/favicons/smiling-face.svg",
  },
};

export default function StandardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
