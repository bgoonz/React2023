import { useState } from "react";
const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑"];
export default function App() {
  const [step, setStep] = useState(1);
  const incrementStep = () => {
    setStep(step === 3 ? 1 : step + 1);
  };

  const decrementStep = () => {
    setStep(step === 1 ? 3 : step - 1);
  };
  return (
    <div className="steps">
      <div className="numbers">
        <div className="active">1</div>
        <div>2</div>
        <div>3</div>
      </div>
      <p className="message">
        Step {step} {messages[step - 1]}
      </p>
      <div className="buttons">
        <button style={{ backgroundColor: "#7950f2", color: "#fff" }} onClick={decrementStep}>
          Previous
        </button>
        <button style={{ backgroundColor: "#7950f2", color: "#fff" }} onClick={incrementStep}>
          Next
        </button>
      </div>
    </div>
  );
}
