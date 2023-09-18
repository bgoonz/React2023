import React from "react";
import ReactDOM from "react-dom/client";
import Pizza from "./components/Pizza";
function App() {
  return (
    <div>
      <h1>Hello World!!!!</h1>
      <Pizza />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
