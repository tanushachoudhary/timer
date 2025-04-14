import React, { useState, useEffect } from "react";
import Stopwatch from "./Stopwatch";
import Timer from "./Timer";
import { FaMoon, FaSun } from "react-icons/fa";
import ParticlesBackground from "./ParticlesBackground";

export default function App() {
  const [mode, setMode] = useState("stopwatch");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition bg-gradient-to-br 
        ${dark ? "from-[#1e1e2f] to-[#2e2e4f]" : "from-pink-200 to-indigo-200"} 
        flex items-center justify-center p-4`}
    >
      {/* 🔮 Particles as background layer */}
      <ParticlesBackground />

      <div className="absolute inset-0 z-0 pointer-events-none sparkle-bg" />

      <div className="relative z-10 bg-white dark:bg-[#2a2a40] text-black dark:text-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-full text-sm font-bold transition
                ${
                  mode === "stopwatch"
                    ? "bg-indigo-400 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                }`}
              onClick={() => setMode("stopwatch")}
            >
              Stopwatch
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-bold transition
                ${
                  mode === "timer"
                    ? "bg-pink-400 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                }`}
              onClick={() => setMode("timer")}
            >
              Timer
            </button>
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:scale-110 transition bg-gray-200 dark:bg-gray-700 text-yellow-500 dark:text-yellow-300"
            title="Toggle theme"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {mode === "stopwatch" ? (
          <Stopwatch cute={true} />
        ) : (
          <Timer cute={true} />
        )}
      </div>
    </div>
  );
}
