import Bill from "./components/Bill";
import Tip from "./components/Tip";
import Output from "./components/Output";
import Reset from "./components/Reset";
import { useState } from "react";
function App() {
  const [bill, setBill] = useState(0);
  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(0);
  const tip = (bill * percent1 + bill * percent2) / 2;
  const amount = bill + tip;

  const handleReset = () => {
    setBill(0);
    setPercent1(0);
    setPercent2(0);
  };

  return (
    <div>
      <h1>Tip Calculator</h1>
      <Bill onInput={setBill} />
      <Tip onSelection={setPercent1}>
        <h4>How much are you tipping?</h4>
      </Tip>
      <Tip onSelection={setPercent2}>
        <h4>How much is your friend tipping?</h4>
      </Tip>
      <Output amount={amount} bill={bill} tip={tip} />
      <Reset />
    </div>
  );
}

export default App;
