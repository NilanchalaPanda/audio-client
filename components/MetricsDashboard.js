"use client";

import { useEffect, useState } from "react";
import { getMetrics } from "../lib/api";

export default function MetricsDashboard() {
  const [metrics, setMetrics] = useState(null);

  const fetchMetrics = async () => {
    try {
      const data = await getMetrics();
      setMetrics(data);
    } catch (err) {
      console.error("Failed to fetch metrics");
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return null;

  const cards = [
    {
      label: "Queue",
      value: metrics.queue.waiting + metrics.queue.active,
      color: "text-blue-400",
    },
    {
      label: "Success",
      value: metrics.jobs.success,
      color: "text-green-400",
    },
    {
      label: "Duplicate",
      value: metrics.jobs.duplicate,
      color: "text-yellow-400",
    },
    {
      label: "Failed",
      value: metrics.jobs.failed,
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mb-12">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-[#151720] border border-zinc-800 rounded-lg p-6 text-center shadow-md"
        >
          <p className="text-zinc-400 text-sm mb-2">{card.label}</p>
          <p className={`text-3xl font-semibold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
