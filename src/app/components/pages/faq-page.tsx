import { DeploymentConfiguration, Theme } from "../../types";

import ProseContainer from "../prose-container";
import CopyLinkIcon from "../copy-link-icon";
import Link from "next/link";
import colorValues from "../../utils/color-values";
import Navbar from "../navbar";
import Footer from "../footer";

export default function FaqPage({
  theme,
  deploymentConfiguration,
}: {
  theme: Theme;
  deploymentConfiguration: DeploymentConfiguration;
}) {
  const { textColorClass, bodyBackgroundColor } = colorValues(theme);

  return (
    <div className={`w-full min-h-screen ${textColorClass}`}>
      <style>
        {/* Hacky style tag applied to body here because body has to be defined in layout, but style depends on theme */}
        {`body { background-color: ${bodyBackgroundColor} }`}
      </style>
      <Navbar theme={theme} deploymentConfiguration={deploymentConfiguration} />
      <div className="m-auto max-w-prose">
        <header className="my-16">
          <ProseContainer theme={theme}>
            <h1 className="m-2 text-4xl">Frequently Asked Questions</h1>
            <h2 className="m-2">Questions I have been asked more than once.</h2>
            <h3 className="m-2 my-4 border-8 p-2 text-2xl font-bold">
              The content and opinions on this website are my own.
            </h3>
          </ProseContainer>
        </header>
        <main className="space-y-8">
          <ProseContainer theme={theme}>
            <section className="space-y-4">
              <h3 className="text-3xl">
                Learning to Code
                <CopyLinkIcon id="learning-to-code" />
              </h3>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Where should I start?
                  <CopyLinkIcon id="get-started" />
                </summary>
                <p>
                  It depends on what you want to do. If you are serious about
                  learning to code for a career change, there are some great
                  schools out there.
                </p>
                <p>
                  If you are looking for a free guided course, I think
                  Harvard&apos;s&nbsp;
                  <Link
                    href="https://pll.harvard.edu/course/cs50-introduction-computer-science?delta=0"
                    className="underline"
                  >
                    CS50
                  </Link>
                  &nbsp;is hard to beat. If you are looking for something less
                  structured, start with a project! Tools like{" "}
                  <Link
                    href="https://aistudio.google.com/"
                    className="underline"
                  >
                    Google AI Studio
                  </Link>
                  {" "}make it easier than ever to turn ideas into working applications.
                </p>
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  What is a good project?
                  <CopyLinkIcon id="first-project" />
                </summary>
                <p>
                  As long as you are passionate about it, I think it can make
                  for a good project. Most of what I learned was through
                  automating spreadsheets at work because I was passionate about
                  making parts of my job less redundant.
                </p>
                <p>
                  If that is a video game, I think&nbsp;
                  <Link href="https://scratch.mit.edu/" className="underline">
                    Scratch
                  </Link>
                  &nbsp;is phenomenal for getting started with logic and
                  fundamentals. If that is a website, start with learning HTML
                  (there are a million great options).
                </p>
                <p>
                  Find a project that excites you and pursue that. Starting with
                  an idea you are passionate about makes it more likely that you
                  will push through when it gets challenging.
                </p>
              </details>
            </section>
          </ProseContainer>
          <ProseContainer theme={theme}>
            <section className="space-y-4">
              <h3 className="text-3xl">
                Software Career
                <CopyLinkIcon id="software-career" />
              </h3>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  What do you work on at Google?
                  <CopyLinkIcon id="google-focus" />
                </summary>
                <p>
                  My focus is on{" "}
                  <Link
                    href="https://goo.gle/builders"
                    className="underline"
                  >
                    builders
                  </Link>
                  . I help people turn ideas into real, helpful tools.
                </p>
                <p>
                  Right now, that&apos;s a lot of guides, videos, and tutorials around{" "}
                  <Link
                    href="https://aistudio.google.com/"
                    className="underline"
                  >
                    Google AI Studio
                  </Link>
                  ,{" "}
                  <Link
                    href="https://firebase.google.com/"
                    className="underline"
                  >
                    Firebase
                  </Link>
                  , and{" "}
                  <Link
                    href="https://cloud.google.com/run"
                    className="underline"
                  >
                    Cloud Run
                  </Link>
                  .
                </p>
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  How did you get your first job in tech?
                  <CopyLinkIcon id="first-job" />
                </summary>
                <p>
                  I used my connections, I took a pay cut, and I got lucky. I
                  still struggle with sharing this story because it forces me to
                  acknowledge the privilege I had and how much luck played a
                  role. If you want to get a job in software, you might have to
                  do those things to land your first role, but this is not
                  advice.
                </p>
                <p>
                  The situation today is different. I joined the industry at a
                  time when bootcamps were not as prevalent. I think I was a
                  worse candidate than the typical bootcamp grad is today.
                </p>
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  How did you get a job at Google?
                  <CopyLinkIcon id="google-job" />
                </summary>
                <p>
                  I applied four times over ten years. The fourth time I applied,
                  when I was successful, I had been teaching software engineers
                  for five years. Depending on your approach to developer
                  relations, the developer advocate role and teaching software
                  can have a lot in common. Like with getting that first job in
                  tech, I think luck plays a role.
                </p>
                <p>
                  I do not have any secrets for this one. I signed up for a job
                  alert and applied to what I felt I was most qualified for. I
                  was also rejected from similar jobs at similar companies in
                  the process.
                </p>
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Will you refer me for a role at Google?
                  <CopyLinkIcon id="google-referral" />
                </summary>
                <p>
                  If we worked together previously and I can confidently
                  recommend you based on that experience, I would be happy to
                  refer you. If we&apos;ve never worked together, I am not
                  comfortable doing that.
                </p>
              </details>
            </section>
          </ProseContainer>
          <ProseContainer theme={theme}>
            <section className="space-y-4">
              <h3 className="text-3xl">
                Communication Preferences
                <CopyLinkIcon id="communication-preferences" />
              </h3>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Can I reach out to you cold?
                  <CopyLinkIcon id="cold-outreach" />
                </summary>
                <p>
                  Sure! But please have something to say
                  (
                  <Link
                    href={"https://nohello.net"}
                    className="underline decoration-blue-400 hover:decoration-blue-600"
                  >
                    nohello.net
                  </Link>
                  ).
                  I&apos;ve had people reach out to correct bugs in my labs,
                  ask for career advice (some I ended up putting on this website),
                  or to tell me they thought a joke in a talk was funny. I love that.
                  Please don&apos;t reach out to sell me something.
                </p>
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Can we schedule a quick chat?
                  <CopyLinkIcon id="quick-chat" />
                </summary>
                <p>
                  Probably not. I have two young kids and a job I really enjoy.
                  My capacity for &quot;just checking in&quot; chats is
                  basically zero.
                </p>
                <p>
                  If you see me at a conference or other event, I&apos;m happy
                  to chat! I love meeting new people, I&apos;m just protective
                  of my time.
                </p>
              </details>
            </section>
          </ProseContainer>
        </main>
      </div>
      <Footer />
    </div>
  );
}
