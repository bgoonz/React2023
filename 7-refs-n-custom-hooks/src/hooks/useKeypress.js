import { useEffect } from "react";

export function useKeypress(key, action) {
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        action();
        console.log(`${key} key pressed`);
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    return function () {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [action, key]);
}
