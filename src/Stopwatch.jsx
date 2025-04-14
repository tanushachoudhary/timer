import React, { useState, useEffect } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(false);
  const [laps, setLaps] = useState([]);
  const [mode, setMode] = useState("stopwatch");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => setTime((prev) => prev + 10), 10);
    }
    return () => clearInterval(interval);
  }, [active]);

  const format = (ms) => {
    const get = (n) => String(Math.floor((ms / n) % 60)).padStart(2, "0");
    const minutes = get(60000);
    const seconds = get(1000);
    const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}:${centiseconds}`;
  };

  return (
    <div>
      <h2 className="text-4xl font-mono text-center mb-6">{format(time)}</h2>
      <div className="flex justify-center gap-4 ">
        <button
          onClick={() => setActive(!active)}
          className="bg-indigo-400 hover:bg-indigo-500 text-white px-5 py-2 rounded-full shadow-md transition hover:scale-105"
        >
          {active ? "Pause" : "⏱️Start"}
        </button>

        <button
          onClick={() => {
            setTime(0);
            setLaps([]);
            setActive(false);
          }}
          className="bg-gray-200 dark:text-black px-4 py-2 rounded-xl shadow-md hover:bg-gray-300 transition"
        >
          Reset
        </button>
       
        {active && (
          <button
            onClick={() => setLaps([...laps, time])}
            className="bg-pink-400 hover:bg-pink-500 text-white px-5 py-2 rounded-full shadow-md transition hover:scale-105"
          >
            🐾 Lap
          </button>
        )}
      </div>

      {laps.length > 0 && (
        <div className="mt-4 max-h-60 overflow-y-auto">
          {laps.map((lap, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 px-4 rounded-xl mb-1 bg-indigo-100 dark:bg-indigo-900 text-sm shadow"
            >
              <span className="font-semibold">Lap {i + 1}</span>
              <span className="font-mono">{format(lap)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
