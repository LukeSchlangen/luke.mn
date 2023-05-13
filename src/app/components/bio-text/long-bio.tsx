import Link from "next/link";
import DeveloperAdvocateAtGoogle from "./phrases/developer-advocate-at-google";
import CoFounderOfCodeChampionship from "./phrases/co-founder-of-code-championship";
import { Tense } from "../../types";
import LearningFollowsExcitement from "./phrases/learning-follows-excitement";
import IntroduceNewcomersToContainersAndKubernetes from "./phrases/introduce-newcomers-to-containers-and-kubernetes";

export default function LongBio({ tense }: { tense: Tense }) {
  const isFirstPerson = tense === "first-person";
  return (
    <>
      <p>
        {isFirstPerson ? "I am a " : "Luke is a "}
        <DeveloperAdvocateAtGoogle />
        {" who believes "}
        <LearningFollowsExcitement />
        {". "}
        {isFirstPerson ? "I find " : "He finds "}
        it rewarding to give approachable talks for beginners, because everyone
        is a beginner at something.
      </p>
      <p>
        {isFirstPerson ? " I " : " He "}
        previously taught at a coding bootcamp. After that,
        {isFirstPerson ? " I " : " He "}
        led an onboarding program for new software engineers at a Fortune 500
        company. Now at Google,
        {isFirstPerson ? " I like to " : " he likes to "}
        <IntroduceNewcomersToContainersAndKubernetes />.
      </p>
      <p>
        Outside of
        {isFirstPerson ? " my " : " his "}
        day job,
        {isFirstPerson ? " I am a " : " he is a "}
        <CoFounderOfCodeChampionship />: a competitive computer coding program
        for 3<sup>rd</sup> to 9<sup>th</sup> grade students.
      </p>
    </>
  );
}
