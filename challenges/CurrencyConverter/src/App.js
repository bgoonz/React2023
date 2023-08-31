// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import React, { useState, useEffect } from "react";
export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [output, setOutput] = useState(0);

  function handleAmount(event) {
    setAmount(Number(event.target.value));
  }
  function handleFromCurrency(event) {
    setFromCurrency(event.target.value);
  }
  function handleToCurrency(event) {
    setToCurrency(event.target.value);
  }

  useEffect(() => {
    async function fetchConversion() {
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
        const data = await response.json();
        console.log(data); // Add this line to check the structure of the data object
        setOutput(data.rates[toCurrency]);
      }
      
    fetchConversion();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <input type="text" name="amount" placeholder={`Amount in ${fromCurrency}`} value={amount} onChange={handleAmount} />
      <select value={fromCurrency} onChange={handleFromCurrency}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurrency} onChange={handleToCurrency}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
