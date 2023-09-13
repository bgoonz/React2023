function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => {
        let btnClass = "btn btn-option";

        if (index === answer) {
          btnClass += " answer";
        }

        if (hasAnswered) {
          if (index === question.correctOption) {
            btnClass += " correct";
          } else {
            btnClass += " wrong";
          }
        }

        return (
          <button key={index} className={btnClass} onClick={() => dispatch({ type: "newAnswer", payload: index })} disabled={hasAnswered}>
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
