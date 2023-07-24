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

const root = ReactDOM.createRoot( document.getElementById( "root" ) );
root.render( <App /> );
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
