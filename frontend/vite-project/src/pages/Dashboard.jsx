
import React, { useState, useEffect } from "react";
import DashboardCard from "../components/DashboardCard";
import { fetchDashboardSummary } from "../services/dashboardService";

const icons = {
  total: (
    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-5a2 2 0 00-2-2h-2a2 2 0 00-2 2v5a2 2 0 002 2z" /></svg>
  ),
  completed: (
    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
  ),
  pending: (
    <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ),
};

export default function Dashboard() {
  const [summary, setSummary] = useState({ totalTasks: 0, completedTasks: 0, pendingTasks: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardSummary()
      .then(data => {
        setSummary(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load dashboard data');
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex-1 p-8 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-8 text-yellow-700">Dashboard</h2>
      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="flex gap-8 flex-wrap justify-center">
          <DashboardCard
            icon={icons.total}
            title="Total Tasks"
            count={summary.totalTasks}
            color="from-blue-100 to-blue-50"
          />
          <DashboardCard
            icon={icons.completed}
            title="Completed Tasks"
            count={summary.completedTasks}
            color="from-green-100 to-green-50"
          />
          <DashboardCard
            icon={icons.pending}
            title="Pending Tasks"
            count={summary.pendingTasks}
            color="from-yellow-100 to-yellow-50"
          />
        </div>
      )}
    </div>
  );
}
