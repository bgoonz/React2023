function Button({ textColor, backgroundColor, clickHandler, text }) {
  return (
    <button
      style={{ backgroundColor: backgroundColor, color: textColor }}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
}

export default Button;
