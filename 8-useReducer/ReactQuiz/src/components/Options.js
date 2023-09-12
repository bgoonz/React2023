function Options({ question }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button key={index} className="btn btn-option">
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
