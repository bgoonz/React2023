import { createContext, useContext, useState } from "react";
//1. Create a context
const counterContext = createContext();

//2. Create a parent component
function Counter({ children }) {
  const [count, setCount] = useState(0);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);

  return (
    <counterContext.Provider value={{ count, increase, decrease }}>
      <span>{children}</span>
    </counterContext.Provider>
  );
}

//3. Create a child component

function Count() {
  const { count } = useContext(counterContext);
  return <span>{count}</span>;
}

function Label({ children }) {
  return <label>{children}</label>;
}

function Increase({ icon }) {
  const { increase } = useContext(counterContext);
  return <button onClick={increase}>{icon}</button>;
}
function Decrease({ icon }) {
  const { decrease } = useContext(counterContext);
  return <button onClick={decrease}>{icon}</button>;
}

//4. add child component as property of parent.
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;
