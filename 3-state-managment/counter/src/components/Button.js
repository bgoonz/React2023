function Button(props) {
  const { clickHandler, backgroundColor, textColor } = props;
  return (
    <button
      style={{ backgroundColor: backgroundColor, color: textColor }}
      onClick={clickHandler}
    >
      {props.children}
    </button>
  );
}

export default Button;
