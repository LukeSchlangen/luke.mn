"use client";

import { Theme, Workout } from "../../types";

import colorValues from "../../utils/color-values";
import { useAuthState } from "react-firehooks";
import { db, auth } from "../../utils/firebase-initialization";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export default function WorkoutPage({ theme }: { theme: Theme }) {
  const { textColorClass, bodyBackgroundColor } = colorValues(theme);
  const [user, loading, error] = useAuthState(auth);
  const workoutsRef = collection(db, "workouts");

  const initialArg: Workout = {
    pullups: "",
    pushups: "",
    video: "https://youtu.be/UItWltVZZmE",
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
        <button
          onClick={() =>
            addDoc(workoutsRef, {
              ...workout,
              time: serverTimestamp(),
            })
          }
        >
          Add Workout
        </button>
        {/* <WorkoutHistory /> */}
      </main>
    </div>
  );
}
