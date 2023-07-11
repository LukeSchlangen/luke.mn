"use client";

import { Theme, Workout } from "../../types";

import colorValues from "../../utils/color-values";
import { useAuthState } from "react-firehooks";
import { db, auth } from "../../utils/firebase-initialization";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default function WorkoutPage({ theme }: { theme: Theme }) {
  const { textColorClass, bodyBackgroundColor } = colorValues(theme);
  const [user, loading, error] = useAuthState(auth);
  const workoutsRef = collection(db, "workouts");
  const videoOptions = [
    { title: "20 Minute", url: "https://youtu.be/UItWltVZZmE", t: "0" },
    { title: "30 Minute", url: "https://youtu.be/cuHwoCWFLIw", t: "40" },
  ];

  const initialArg: Workout = {
    pullups: "",
    pushups: "",
    video: "https://youtu.be/UItWltVZZmE",
    videoDepth: "",
  };

  const [workout, setWorkout] = useState<Workout>(initialArg);

  if (!user) {
    return (
      <div>
        <button onClick={() => signInWithPopup(auth, provider)}>Log In</button>
      </div>
    );
  }

  if (user.email !== "lukeschlangen@gmail.com") {
    return (
      <div>
        You are not allowed to view this page
        <button onClick={() => signInWithPopup(auth, provider)}>Log In</button>
      </div>
    );
  }

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
              {key === "video" ? (
                <>
                  <select
                    onChange={(event) =>
                      setWorkout({ ...workout, [key]: event.target.value })
                    }
                    value={workout[key]}
                  >
                    {videoOptions.map((videoOption) => (
                      <option key={videoOption.url} value={videoOption.url}>
                        {videoOption.title}
                      </option>
                    ))}
                  </select>
                  <a href={workout[key]}>{workout[key]}</a>
                </>
              ) : (
                <input
                  placeholder={key}
                  onChange={(event) =>
                    setWorkout({ ...workout, [key]: event.target.value })
                  }
                  value={workout[key]}
                />
              )}
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
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </main>
    </div>
  );
}
