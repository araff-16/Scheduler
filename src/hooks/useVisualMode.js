import {useState} from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);

  const transition = (value) => {
    setMode(value)
  }

  return {mode, transition};
}

