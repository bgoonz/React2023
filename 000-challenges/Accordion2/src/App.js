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
function AccordionItem({ num, title, current, onOpen, children }) {
  const isOpen = current === num;
  const handleClick = () => {
    onOpen(isOpen ? null : num);
  };
  return (
    <div className={isOpen ? "item open" : "item"} onClick={handleClick}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen ? <div className="content-box">{children}</div> : null}
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
            key={index}
            current={current}
            onOpen={setCurrent}
          >
            {ele.text}
          </AccordionItem>
        );
      })}
    </div>
  );
}
