import DeveloperAdvocateAtGoogle from "./phrases/developer-advocate-at-google";
import CoFounderOfCodeChampionship from "./phrases/co-founder-of-code-championship";
import { TenseOption } from "../../types";
import LearningFollowsExcitement from "./phrases/learning-follows-excitement";
import Builders from "./phrases/builders";
import GoogleAIStudio from "./phrases/google-ai-studio";
import Firebase from "./phrases/firebase";
import CloudRun from "./phrases/cloud-run";

export default function MediumBio({ tense }: { tense: TenseOption }) {
  const isFirstPerson = tense === "first-person";
  return (
    <>
      <p>
        {isFirstPerson ? "I am a " : "Luke is a "}
        <DeveloperAdvocateAtGoogle />
        {" with a focus on "}
        <Builders />
        {". "}
        {isFirstPerson ? "I help " : "He helps "}
        {"people turn their ideas into real, helpful tools. "}
        {"Right now, that's a lot of "}
        <GoogleAIStudio />
        {", "}
        <Firebase />
        {", and "}
        <CloudRun />
        {"."}
      </p>
      <p>
        {isFirstPerson ? "I believe " : "He believes "}
        <LearningFollowsExcitement />
        {" and "}
        {isFirstPerson ? "enjoy " : "enjoys "}
        {"giving approachable talks for beginners, because everyone is a beginner at something."}
      </p>
      <p>
        {"Previously, "}
        {isFirstPerson ? "I " : "he "}
        {"taught at a coding bootcamp and led software engineer onboarding at a Fortune 500 company."}
      </p>
      <p>
        {"Outside of Google, "}
        {isFirstPerson ? "I am a " : "he is a "}
        <CoFounderOfCodeChampionship />
        {isFirstPerson ? "where I lead " : "where he leads "}
        {"competitive computer coding programs for 3"}
        <sup>rd</sup>
        {" to 9"}
        <sup>th</sup>
        {" grade students."}
      </p>
    </>
  );
}
