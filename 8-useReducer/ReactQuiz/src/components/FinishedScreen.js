function FinishedScreen({ points, maxPoints, index, numQuestions }) {
  const percentage = Math.ceil((points / maxPoints) * 100);
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of <strong>{maxPoints}</strong>{" "}
      points! ({percentage}%) 🙌
    </p>
  );
}

export default FinishedScreen;
