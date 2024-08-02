import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeOut }) {
  const [remainingTime, setTimeRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeOut, timeout);


    return () => {
        clearTimeout(timer);
    };

  }, [timeout, onTimeOut]); // dependency here as we are using 2 prop values

  // this useEffect is used to prevent inf loop bcoz after every state update this component will re execute and lead to inf loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () =>{
        clearInterval(interval);
    };

  }, []); // no dependency here as we are not using any prop or state value

  return <progress id="question-time" value={remainingTime} max={timeout} />;
}
