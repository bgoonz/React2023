import React from "react";

function Tip({ children, percent, onSelection }) {
  function handleSelection(e) {
    onSelection(Number(e.target.value));
  }
  return (
    <>
      <div>{children}</div>
      <select value={percent} onChange={handleSelection}>
        <option value="0.05">5%</option>
        <option value="0.1">10%</option>
        <option value="0.15">15%</option>
        <option value="0.2">20%</option>
      </select>
    </>
  );
}

export default Tip;
