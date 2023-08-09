# React

## React v18 basic setup:

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

> With previous versions of react:

```js
import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

- When a component is removed from the view, this is called unmounting.
- When state or props change, the component is re-rendered (this means the component is removed and replaced with the component function using updated state or props).
- state is updated using an event handler or a callback function.
- React is called react because it reacts to state changes by re-rendering the UI.

- In the following code we would expect the incrementStep function to update the state twice...

```js
const incrementStep = () => {
  setStep(step === 3 ? 1 : step + 1);
  setStep(step === 3 ? 1 : step + 1);
};
```

- In reality it only updates once.
- We should not rely on the previous state when updating state.
- If we want to update state based on previous state we should provide a callback function to the setter function.

```js
const incrementStep = () => {
  setStep((prevStep) => (prevStep === 3 ? 1 : prevStep + 1));
  setStep((prevStep) => (prevStep === 3 ? 1 : prevStep + 1));
};
```


> Each instance of a component has and manages it's own state.

## Guidlines for using state:

- Use a state variable for any data the component should keep track of over time. (like a `let` or `var` variable or a `const` array or object that you mutate over time).

- For data that should not trigger a component re-render use a regular variable instead or use a ref.


