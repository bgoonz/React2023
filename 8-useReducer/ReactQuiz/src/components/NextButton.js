function NextButton({ dispatch, answer }) {
  // If the user hasn't answered the question
  if (answer === null) return null;
  return (
    <>
      <button className="btn btn-ui">Next </button>
    </>
  );
}

export default NextButton;
