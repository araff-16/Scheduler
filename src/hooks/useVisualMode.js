import {useState} from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (value) => {
    setHistory([...history, value])
    setMode(value)
  }

  const back = () => {
    if(history.length > 1){
    setMode(history[history.length-2]) 
    setHistory(history.slice(0,-1))
    }
  }
 
  return {mode, transition, back};
}

