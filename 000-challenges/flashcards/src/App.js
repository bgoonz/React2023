import { useState } from "react";
// In the file where you want to import the array
import { questions } from "./questions.js";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

function FlashCards() {
  const [selected, setSelected] = useState(0);

  function handleClick(questionId) {
    setSelected(questionId);
  }

  return (
    <div className="flashcards">
      {questions.map((question) => {
        return (
          <div
            className={selected === question.id ? "selected" : ""}
            key={question.id}
            onClick={() => handleClick(question.id)}
          >
            <p>
              {selected !== question.id ? question.question : question.answer}
            </p>
          </div>
        );
      })}
    </div>
  );
}
