import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const initialState = {
  questions: [],
  // loading, error, ready, active,finished
  status: "loading",
  index: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function App() {
  const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}

export default App;
