import { useState, useEffect } from "react";

function Clock({ time, setTime, isResting, setIsResting, selected }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      clearInterval(interval);
      if (!isResting && selected) {
        setTime(selected.rest * 60);
        setIsResting(true);
      } else {
        setIsActive(false);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time, isResting, selected, setTime, setIsResting]);

  const onStart = () => {
    setIsActive(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="text-center">
      <div>
        {isResting ? "Rest" : "Study"}:{formatTime(time)}
      </div>
      <button onClick={onStart}>Start</button>
    </div>
  );
}

export default Clock;
