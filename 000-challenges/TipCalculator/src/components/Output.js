import React from "react";

function Output({ amount, bill, tip }) {
  return (
    <>
      <h2>
        You Pay ${`${amount}`} (${`${bill}`} + ${`${tip}`} tip)
      </h2>
    </>
  );
}

export default Output;
