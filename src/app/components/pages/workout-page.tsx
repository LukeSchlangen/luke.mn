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
  const [status, setStatus] = useState<string>("WORKING_OUT");

  const initialArg: Workout = {
    pullups: "",
    pushups: "",
    video: "https://youtu.be/UItWltVZZmE",
    videoDepth: "",
  };

  const [workout, setWorkout] = useState<Workout>(initialArg);

  const startTime =
    videoOptions.find((video) => video.url === workout.video)?.t || "0";

  const saveWorkout = () => {
    addDoc(workoutsRef, {
      ...workout,
      time: serverTimestamp(),
    }).then(() => setStatus("WORKOUT_SAVED"));
  };

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
            <div key={key} className="m-2">
              {key === "video" ? (
                <>
                  <select
                    onChange={(event) =>
                      setWorkout({ ...workout, [key]: event.target.value })
                    }
                    value={workout.video}
                  >
                    {videoOptions.map((videoOption) => (
                      <option key={videoOption.url} value={videoOption.url}>
                        {videoOption.title}
                      </option>
                    ))}
                  </select>
                  <a href={`${workout.video}&t=${startTime}`}>
                    {`${workout.video}&t=${startTime}`}
                  </a>
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
        {status === "WORKOUT_SAVED" ? (
          <>Workout Saved!</>
        ) : (
          <button
            className="m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={saveWorkout}
          >
            Add Workout
          </button>
        )}
        {/* <WorkoutHistory /> */}
      </main>
    </div>
  );
}
