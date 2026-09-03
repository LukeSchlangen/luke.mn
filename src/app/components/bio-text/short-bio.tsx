import DeveloperAdvocateAtGoogle from "./phrases/developer-advocate-at-google";
import CoFounderOfCodeChampionship from "./phrases/co-founder-of-code-championship";
import { TenseOption } from "../../types";
import LearningFollowsExcitement from "./phrases/learning-follows-excitement";
import Builders from "./phrases/builders";
import GoogleAIStudio from "./phrases/google-ai-studio";
import Firebase from "./phrases/firebase";
import CloudRun from "./phrases/cloud-run";

export default function ShortBio({ tense }: { tense: TenseOption }) {
  const isFirstPerson = tense === "first-person";
  return (
    <>
      <p>
        {isFirstPerson ? "I am a " : "Luke is a "}
        <DeveloperAdvocateAtGoogle />
        {" with a focus on "}
        <Builders />
        {". "}
      </p>
      <p>
        {isFirstPerson ? "I am a " : "He is a "}
        <CoFounderOfCodeChampionship />
        {". "}
      </p>
      <p>
        {isFirstPerson ? "I believe " : "He believes "}
        <LearningFollowsExcitement />
        {"."}
      </p>
    </>
  );
}
