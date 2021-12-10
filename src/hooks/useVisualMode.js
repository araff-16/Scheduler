import {useState} from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (value, replace = false) => {

    if (replace){
      setHistory([...history.slice(0,1), value])
      setMode(value)
    } else {
    setHistory([...history, value])
    setMode(value)
    }
  }

  const back = () => {
    if(history.length > 1){
    setMode(history[history.length-2]) 
    setHistory(history.slice(0,-1))
    }
  }
 
  return {mode, transition, back};
}

