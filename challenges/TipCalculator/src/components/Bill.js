import React from "react";

function Bill({ bill, onInput }) {
  const handleInput = (e) => {
    onInput(Number(e.target.value));
  };

  return (
    <>
      <h4>How much was the bill?</h4>
      <input
        type="text"
        name="Amount"
        placeholder="$Amount...$"
        value={bill}
        onChange={handleInput}
      ></input>
    </>
  );
}

export default Bill;
