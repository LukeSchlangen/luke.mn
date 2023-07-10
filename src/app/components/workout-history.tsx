import { collection, query } from "firebase/firestore";
import { db } from "../utils/firebase-initialization";
import { useQueryDataOnce } from "react-firehooks";

export default function WorkoutHistory() {
  const workoutsRef = collection(db, "workouts");
  const [data, dataLoading, dataError] = useQueryDataOnce(
    query(workoutsRef),
    {}
  );

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
