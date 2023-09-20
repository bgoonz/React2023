import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

const SECONDS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  // loading, error, ready, active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: SECONDS_PER_QUESTION * state.questions.length
      };
    case "newAnswer":
      const curQuestion = state.questions[state.index];

      // recieved answer from user is action.payload
      return {
        ...state,
        answer: action.payload,
        points: action.payload === curQuestion.correctOption ? state.points + curQuestion.points : state.points
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        highscore: state.highscore,
        index: 0,
        questions: state.questions
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: Math.max(0, state.secondsRemaining - 1),
        status: state.secondsRemaining - 1 <= 0 ? "finished" : state.status
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function QuizProvider({ children }) {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
