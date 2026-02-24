"use client";

import { useEffect, useState } from "react";
import { checkSystemHealth } from "../lib/api";

export default function SystemStatus() {
  const [status, setStatus] = useState("checking");

  const fetchHealth = async () => {
    try {
      await checkSystemHealth();
      setStatus("healthy");
    } catch {
      setStatus("down");
    }
  };

  useEffect(() => {
    fetchHealth();

    const interval = setInterval(fetchHealth, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, []);

  const dotColor =
    status === "healthy"
      ? "bg-green-500"
      : status === "down"
        ? "bg-red-500"
        : "bg-yellow-500";

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="relative flex h-3 w-3 items-center justify-center">
        {/* Ping Ring */}
        <span
          className={`absolute h-3 w-3 rounded-full ${dotColor} opacity-75 animate-ping`}
        />

        {/* Center Dot */}
        <span className={`absolute h-2 w-2 rounded-full ${dotColor}`} />
      </span>

      <span className="text-xs text-zinc-400 italic">
        {status === "healthy"
          ? "System Healthy"
          : status === "down"
            ? "API Unreachable"
            : "Checking..."}
      </span>
    </div>
  );
}
