import Hero from "./components/Hero";
import Options from "./components/Options";
import Clock from "./components/Clock";
import { useState, useEffect } from "react";

function App() {
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(0);
  const [isResting, setIsResting] = useState(false);

  const reqNotif = () => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    reqNotif();
  }, []);

  const handleSelect = (timing) => {
    setSelected(timing);
    setTime(timing.study * 60);
    setIsResting(false);
  };

  const timings = [
    {
      id: 1,
      study: 25,
      rest: 5,
    },
    {
      id: 2,
      study: 50,
      rest: 10,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div>
        <Hero />
        <Options
          timings={timings}
          onSelect={handleSelect}
          select={selected?.id}
        />
        <Clock
          time={time}
          setTime={setTime}
          isResting={isResting}
          setIsResting={setIsResting}
          selected={selected}
        />
      </div>
    </div>
  );
}

export default App;
