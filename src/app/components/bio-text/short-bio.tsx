import Link from "next/link";
import DeveloperAdvocateAtGoogle from "./phrases/developer-advocate-at-google";
import CoFounderOfCodeChampionship from "./phrases/co-founder-of-code-championship";
import { TenseOption } from "../../types";
import LearningFollowsExcitement from "./phrases/learning-follows-excitement";

export default function ShortBio({ tense }: { tense: TenseOption }) {
  const isFirstPerson = tense === "first-person";
  return (
    <>
      <p>
        {isFirstPerson ? "I am a " : "Luke is a "}
        <DeveloperAdvocateAtGoogle />.
      </p>
      <p>
        {isFirstPerson ? "I am a " : "He is a "}
        <CoFounderOfCodeChampionship />.
      </p>
      <p>
        {isFirstPerson ? "I believe " : "He believes "}
        <LearningFollowsExcitement />.
      </p>
    </>
  );
}
