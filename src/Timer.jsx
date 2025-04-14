import React, { useState, useEffect } from "react";
import CircularDial from "./CircularDial";

export default function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // New state
  const [mode, setMode] = useState("stopwatch");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    let interval;
    if (active && remaining > 0) {
      interval = setInterval(() => setRemaining((prev) => prev - 1), 1000);
    } else if (active && remaining === 0) {
      setActive(false);
    }
    return () => clearInterval(interval);
  }, [active, remaining]);

  const format = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStart = () => {
    const totalSec = minutes * 60 + seconds;
    if (totalSec > 0) {
      setRemaining(totalSec);
      setTotal(totalSec);
      setActive(true);
      setHasStarted(true);
    }
  };

  const handleResume = () => {
    if (remaining > 0) {
      setActive(true);
    }
  };

  const handlePause = () => {
    setActive(false);
  };

  const handleStop = () => {
    setActive(false);
    setRemaining(total);
  };

  const handleReset = () => {
    setActive(false);
    setRemaining(0);
    setTotal(0);
    setMinutes(0);
    setSeconds(0);
    setHasStarted(false);
  };

  const progress = total > 0 ? (remaining / total) * 100 : 0;

  return (
    <div>
      {hasStarted ? (
        <>
          <CircularDial progress={progress} color="pink" />
          <h2 className="text-4xl font-mono text-center mb-4">
            {format(remaining || 0)}
          </h2>
        </>
      ) : (
        <div className="flex gap-2 justify-center mb-4">
          <input
            type="number"
            min="0"
            value={minutes}
            placeholder="MM"
            className="w-20 p-2 border rounded text-center dark:text-black"
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            placeholder="SS"
            className="w-20 p-2 border rounded text-center dark:text-black"
            onChange={(e) => setSeconds(Number(e.target.value))}
          />
        </div>
      )}

      <div className="flex justify-center gap-4">
        {!hasStarted ? (
          <button
            onClick={handleStart}
            className="bg-pink-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-pink-600 transition"
          >
            Start
          </button>
        ) : active ? (
          <button
            onClick={handlePause}
            className="bg-indigo-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-indigo-600 transition"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={handleResume}
            className="bg-green-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-green-600 transition"
          >
            Resume
          </button>
        )}

        {hasStarted && (
          <button
            onClick={handleStop}
            className="bg-red-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-red-600 transition"
          >
            Stop
          </button>
        )}

        <button
          onClick={handleReset}
          className="bg-gray-200 dark:text-black px-4 py-2 rounded-xl shadow-md hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
