import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenInCapturePhase = true) {
  const ref = useRef();
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }
    //the third argument is true to capture the event in the capturing phase (and prevent bubbling up that would cause the click that opens the modal to handler it immediately)
    document.addEventListener("click", handleClick, listenInCapturePhase);

    return () => {
      document.removeEventListener("click", handleClick, listenInCapturePhase);
    };
  }, [handler, listenInCapturePhase]);
  return ref;
}
