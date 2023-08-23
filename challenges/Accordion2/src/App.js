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
function AccordionItem({ num, title, text, current, onOpen }) {
  const isOpen = current === num;
  const handleClick = () => {
    onOpen(num);
  };
  return (
    <div className={isOpen ? "item open" : "item"} onClick={handleClick}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen ? <div className="content-box">{text}</div> : null}
    </div>
  );
}
function Accordion({ data }) {
  const [current, setCurrent] = useState(null);

  return (
    <div className="accordion">
      {data.map((ele, index) => {
        return (
          <AccordionItem
            title={ele.title}
            num={index}
            text={ele.text}
            current={current}
            onOpen={setCurrent}
          />
        );
      })}
    </div>
  );
}
