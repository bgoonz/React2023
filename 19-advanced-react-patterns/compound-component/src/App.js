import Counter from "./Counter";

export default function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>

      <Counter>
        <Counter.Label>My super flexible counter.</Counter.Label>
        <Counter.Decrease icon="-"></Counter.Decrease>
        <Counter.Count></Counter.Count>
        <Counter.Increase icon="+"></Counter.Increase>
      </Counter>
    </div>
  );
}
