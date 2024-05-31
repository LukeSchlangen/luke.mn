export default function CommandList({ steps }: { steps: string[] }) {
  return (
    <ul className="command-list">
      {steps.map((step, index) => (
        <li key={`${index}_${step}`}>{step}</li>
      ))}
    </ul>
  );
}
