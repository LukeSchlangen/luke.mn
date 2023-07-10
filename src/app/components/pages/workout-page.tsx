"use client";

import { Theme, Workout } from "../../types";

import ProseContainer from "../prose-container";
import CopyLinkIcon from "../copy-link-icon";
import Link from "next/link";
import colorValues from "../../utils/color-values";
import Navbar from "../navbar";
import WorkoutHistory from "../workout-history";
import { useAuthState, useQueryDataOnce } from "react-firehooks";
import { db, auth } from "../../utils/firebase-initialization";
import { addDoc, collection, query } from "firebase/firestore";
import { useReducer, useState } from "react";

export default function WorkoutPage({ theme }: { theme: Theme }) {
  const { textColorClass, bodyBackgroundColor } = colorValues(theme);
  const [user, loading, error] = useAuthState(auth);
  const workoutsRef = collection(db, "workouts");
  const [data, dataLoading, dataError] = useQueryDataOnce(
    query(workoutsRef),
    {}
  );

  const initialArg: Workout = {
    pullups: "",
    pushups: "",
    time: "",
    video: "",
    videoDepth: "",
  };

  const [workout, setWorkout] = useState<Workout>(initialArg);

  return (
    <div className={`min-w-screen min-h-screen ${textColorClass}`}>
      <style>
        {/* Hacky style tag applied to body here because body has to be defined in layout, but style depends on theme */}
        {`body { background-color: ${bodyBackgroundColor} }`}
      </style>
      <main>
        {Object.keys(initialArg).map((key) => {
          return (
            <div key={key}>
              <input
                placeholder={key}
                onChange={(event) =>
                  setWorkout({ ...workout, [key]: event.target.value })
                }
                value={workout[key]}
              />
            </div>
          );
        })}
        <button onClick={() => addDoc(workoutsRef, workout)}>
          Add Workout
        </button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <WorkoutHistory />
      </main>
    </div>
  );
}
