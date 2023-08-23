import { useState } from "react";
import Button from "./components/Button";
import StepMessage from "./components/StepMessage";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div className="App">
      <Steps />
    </div>
  );
}
function Steps() {
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(true);
  const incrementStep = () => {
    // setStep((prevStep) => (prevStep === 3 ? 1 : prevStep + 1));
    setStep((prevStep) => (prevStep === 3 ? 1 : prevStep + 1));
  };
  const decrementStep = () => {
    setStep(step === 1 ? 3 : step - 1);
  };
  return (
    <>
      <button className="close" onClick={() => setShow((is) => !is)}>
        &times;
      </button>
      {show && (
        <div className="steps">
          <div className="numbers">
            <div className={step === 1 ? "active" : ""}>1</div>
            <div className={step === 2 ? "active" : ""}>2</div>
            <div className={step === 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button
              clickHandler={decrementStep}
              backgroundColor="#7950f2"
              textColor="#fff"
            >
              <span>⏮️</span> Previous
            </Button>

            <Button
              clickHandler={incrementStep}
              backgroundColor="#7950f2"
              textColor="#fff"
              emoji="⏭️"
            >
              {" "}
              Next<span>⏭️</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
