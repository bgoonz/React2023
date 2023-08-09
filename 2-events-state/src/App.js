import { useState } from "react";
const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑"];
export default function App() {
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(true);
  const incrementStep = () => {
    setStep(step === 3 ? 1 : step + 1);
  };

  const decrementStep = () => {
    setStep(step === 1 ? 3 : step - 1);
  };
  return (
    <div>
        <button className="close" onClick={() => setShow(!show)}>&times;</button>
      {show && (
        <div className="steps">
          <div className="numbers">
            <div className={step === 1 ? "active" : ""}>1</div>
            <div className={step === 2 ? "active" : ""}>2</div>
            <div className={step === 3 ? "active" : ""}>3</div>
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
      )}
    </div>
  );
}
