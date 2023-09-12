function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={index}
          className={`btn btn-option`}
          onClick={() => dispatch({type: "newAnswer", payload: index})}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
