import React from "react";

export default function CircularDial({ progress = 0, size = 180, strokeWidth = 10, color = "indigo" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colors = {
    indigo: "stroke-indigo-500 dark:stroke-indigo-300",
    pink: "stroke-pink-500 dark:stroke-pink-300",
  };

  return (
    <svg width={size} height={size} className="mx-auto mb-4">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        className="fill-none stroke-gray-300 dark:stroke-gray-600"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        className={`fill-none ${colors[color]}`}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          transition: "stroke-dashoffset 0.5s ease-out",
        }}
      />
    </svg>
  );
}
