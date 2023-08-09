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
- 
