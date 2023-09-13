import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(timerId);
  }, [dispatch]);
  return (
    <div className="timer">
      <span className="minutes">{minutes.toString().padStart(2, "0")}</span>:<span className="seconds">{seconds.toString().padStart(2, "0")}</span>
    </div>
  );
}

export default Timer;
