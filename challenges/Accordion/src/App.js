import "./index.css";
import React, { useState } from "react";
import { faqs } from "./data";

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}
function AccordionItem({ num, title, text }) {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div className={show ? "item open" : "item"} onClick={handleClick}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{show ? "-" : "+"}</p>
      {show ? <div className="content-box">{text}</div> : null}
    </div>
  );
}
function Accordion({ data }) {
  return (
    <div className="accordion">
      {data.map((ele, index) => {
        return <AccordionItem title={ele.title} num={index} text={ele.text} />;
      })}
    </div>
  );
}
