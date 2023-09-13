function FinishedScreen({ points, maxPoints, index, numQuestions }) {
  const percentage = Math.ceil((points / maxPoints) * 100);
  
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of <strong>{maxPoints}</strong>{" "}
      points! ({percentage}%) {emoji}
    </p>
  );
}

export default FinishedScreen;
