import React from "react";

export default function DashboardCard({ icon, title, count, color }) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl shadow-md p-6 w-40 h-40 transition-transform bg-gradient-to-br ${color} hover:scale-105`}
    >
      <div className="mb-2 text-4xl">{icon}</div>
      <div className="text-lg font-semibold mb-1">{title}</div>
      <div className="text-2xl font-bold">{count}</div>
    </div>
  );
}
