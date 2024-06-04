import { useState, useEffect } from "react";

function Clock({ time, setTime, isResting, setIsResting, selected }) {
  const [isActive, setIsActive] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [pausedTime, setPausedTime] = useState(null);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0 && !isPause) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && (time === 0 || isPause)) {
      clearInterval(interval);

      if (!isResting && selected && !isPause) {
        sendNotification("Break Time", "You earned it");
        setTime(selected.rest * 60);
        setIsResting(true);
      } else if (isResting && selected && !isPause) {
        sendNotification("Time to get back", "Start timer again");
        setTime(selected.study * 60);
        setIsResting(false);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time, isResting, selected, setTime, setIsResting, isPause]);

  const sendNotification = (message, subMessage) => {
    if (Notification.permission === "granted") {
      new Notification(message, {
        body: subMessage,
      });
    }
  };

  const onStart = () => {
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsPause((prevPause) => !prevPause);
      if (!isPause) {
        setPausedTime(time);
      } else {
        setTime(pausedTime);
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="text-center">
      <div className="my-4 text-3xl">{formatTime(time)}</div>
      <div className="text-md">{isResting ? "Rest" : "Study"}</div>
      <button
        onClick={onStart}
        className="text-center justify-center mt-4 text-xl"
      >
        {isPause ? "Pause" : "Start"}
      </button>
    </div>
  );
}

export default Clock;
