import { DeploymentConfiguration, Theme } from "../../types";

import ProseContainer from "../prose-container";
import CopyLinkIcon from "../copy-link-icon";
import Link from "next/link";
import colorValues from "../../utils/color-values";
import Navbar from "../navbar";
import Footer from "../footer";

export default function FaqPage({ theme, deploymentConfiguration }: { theme: Theme, deploymentConfiguration: DeploymentConfiguration }) {
  const { textColorClass, bodyBackgroundColor } = colorValues(theme);

  return (
    <div className={`min-w-screen min-h-screen ${textColorClass}`}>
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
                  structured, start with a project!
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
                  I applied four times over ten years. The fourth time I applied
                  — the time I was successful — I had been teaching software
                  engineers for five years. Depending on your approach to
                  developer relations, the developer advocate role and teaching
                  software can have a lot in common. Like with getting that
                  first job in tech, I think luck plays a role.
                </p>
                <p>
                  I do not have any secrets for this one. I signed up for a job
                  alert and applied to what I felt I was most qualified for. I
                  was also rejected from similar jobs at similar companies in
                  the process.
                </p>
              </details>
            </section>
          </ProseContainer>
          {/* <ProseContainer theme={theme}>
            <section className="space-y-4">
              <h3 className="text-3xl">
                Tech Talent Shortage
                <CopyLinkIcon id="talent-shortage" />
              </h3>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Is the tech talent shortage real?
                  <CopyLinkIcon id="shortage-real" />
                </summary>
                <p>It depends on what you mean. I have opinions...</p>
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Should we be teaching computer science to students?
                  <CopyLinkIcon id="teaching-students" />
                </summary>
                <p>
                  Yes! I believe that all students should learn a little bit
                  about code. Even if they are not professional software
                  developers, - and I do not think everyone has to be - code is
                  going to be such an important part of their lives, that they
                  should know at least a little bit about it.
                </p>
                <p>
                  This is why I am a <CoFounderOfCodeChampionship />
                </p>
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  Why can&apos;t my company find any qualified candidates?
                  <CopyLinkIcon id="qualified-candidates" />
                </summary>
                <p>
                  I know this might sound harsh, but I want to be direct. When
                  companies say this, they are typically saying one of these two
                  things:
                </p>
                <ul className="list-inside list-disc">
                  <li>
                    &quot;We are not willing to pay the market rate for
                    talent.&quot;
                  </li>
                  <li>
                    &quot;We are not great at onboarding entry-level
                    talent.&quot;
                  </li>
                </ul>
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  How can I find entry-level talent?
                  <CopyLinkIcon id="entry-level" />
                </summary>
                <p>
                  If you are looking for entry-level talent, there is so much of
                  that available right now. When we opened a posting for an
                  entry-level role in my prior job, we had 600 applicants for 10
                  spots. The quality of the candidate pool was incredibly
                  strong.
                </p>
                <p>
                  There are so many great places to find this talent, but if you
                  genuinely do not know where to start, I spent three years
                  teaching at&nbsp;
                  <Link
                    className="underline"
                    href="https://www.primeacademy.io/"
                  >
                    Prime Digital Academy
                  </Link>
                  &nbsp; and that is where I would start my search if I was
                  looking for strong entry-level talent.
                </p>
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  How can I find senior talent?
                  <CopyLinkIcon id="senior-talent" />
                </summary>
                <p>
                  Post the salary in the job description and they will come.
                </p>
                <p>
                  If you are looking for senior talent, then you will need to
                  pay more for it. If you are looking for senior talent and you
                  are not willing to pay more for it, that is the answer to why
                  your company can&apos;t find any qualified candidates.
                </p>
                <p>
                  If you are looking for senior talent at a less expensive rate,
                  the most effective strategy I have seen is to hire entry-level
                  talent and be very intentional about onboarding them.
                </p>
              </details>
              <details open className="space-y-4 border p-2 pl-4">
                <summary className="-ml-2 text-xl">
                  How can we onboard new talent?
                  <CopyLinkIcon id="onboard-talent" />
                </summary>
                <p>
                  Onboarding is something a lot of places <i>think</i> they do
                  well, but very few do. While internal onboarding programs are
                  fantastic, I know they are a lot of work and require approval
                  from upper-level management to fund. Even then, they are hard
                  to get right.
                </p>
                <p>
                  The easiest way to improve your ramp-up process for new
                  developers is to set aside 30 minutes every day for each
                  junior to meet one-on-one with a senior engineer. These
                  meetings might take 5 minutes or the full 30 minutes, but
                  creating these &quot;unstuck sessions&quot; shows junior
                  engineers that it is ok &lpar;and even&nbsp;
                  <i>expected</i>
                  &rpar; for them to need help. These are easy to implement at a
                  team level and do not require permission from the higher-ups.
                </p>
              </details>
            </section>
          </ProseContainer> */}
        </main>
      </div>
      <Footer />
    </div>
  );
}
