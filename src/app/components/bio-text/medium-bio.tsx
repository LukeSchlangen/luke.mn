import DeveloperAdvocateAtGoogle from "./phrases/developer-advocate-at-google";
import CoFounderOfCodeChampionship from "./phrases/co-founder-of-code-championship";
import { TenseOption } from "../../types";
import LearningFollowsExcitement from "./phrases/learning-follows-excitement";
import GoogleKubernetesEngine from "./phrases/google-kubernetes-engine";
import GoogleCloudRun from "./phrases/google-cloud-run";

export default function MediumBio({ tense }: { tense: TenseOption }) {
  const isFirstPerson = tense === "first-person";
  return (
    <>
      <p>
        {isFirstPerson ? "I am a " : "Luke is a "}
        {"JavaScript "}
        <DeveloperAdvocateAtGoogle />
        {" who believes "}
        <LearningFollowsExcitement />
        {". "}
        {isFirstPerson ? "I like " : "He likes "}
        giving approachable talks for beginners, because everyone is a beginner
        at something.
      </p>
      <p>
        {isFirstPerson ? " I " : " He "}
        previously taught at a coding bootcamp. After that,
        {isFirstPerson ? " I " : " He "}
        led an onboarding program for new software engineers at a Fortune 500
        company. Now at Google,
        {isFirstPerson ? " I like to " : " he likes to "}
        {"help developers deploy their applications to places like "}
        <GoogleCloudRun />
        {" and "}
        <GoogleKubernetesEngine />.
      </p>
      <p>
        Outside of
        {isFirstPerson ? " my " : " his "}
        work at Google,
        {isFirstPerson ? " I am a " : " he is a "}
        <CoFounderOfCodeChampionship />: a competitive computer coding program
        for 3<sup>rd</sup> to 9<sup>th</sup> grade students.
      </p>
    </>
  );
}
