import { useState } from "react";
function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function getOffsetDate(offset) {
    const today = new Date();
    today.setDate(today.getDate() + offset);
    return today.toLocaleDateString();
  }

  const incrementStep = () => {
    setStep(step + 1);
  };
  const decrementStep = () => {
    setStep(step - 1);
  };
  const incrementCount = () => {
    setCount(count + step);
  };
  const decrementCount = () => {
    setCount(count - step);
  };

  return (
    <div className="App">
      <h1>Challenge: Date Counter</h1>
      <div className="step">
        <button className="decrement" onClick={decrementStep}>
          {" "}
          -{" "}
        </button>
        Step:{step}
        <button className="increment" onClick={incrementStep}>
          {" "}
          +{" "}
        </button>
      </div>
      <div className="count">
        <button className="decrement" onClick={decrementCount}>
          {" "}
          -{" "}
        </button>
        Count: {count}
        <button className="increment" onClick={incrementCount}>
          {" "}
          +{" "}
        </button>
      </div>

      <div className="date">
        {count} days from today is: {getOffsetDate(count)}
      </div>
    </div>
  );
}

export default Counter;
