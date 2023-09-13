function NextButton({ dispatch, answer, index, numQuestions }) {
    // If the user hasn't answered the question
    if (answer === null || index >= numQuestions - 1) return null;
  
    return (
      <>
        <button className="btn btn-ui" onClick={()=>dispatch({type:"nextQuestion"})}>Next </button>
      </>
    );
  }
  
  export default NextButton;
  