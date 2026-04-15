// src/services/dashboardService.js
// Handles API call for dashboard summary

const API_URL = 'http://localhost:5000/dashboard-summary';

function getToken() {
  return localStorage.getItem('token');
}

export async function fetchDashboardSummary() {
  const res = await fetch(API_URL, {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  });
  if (!res.ok) throw new Error('Failed to fetch dashboard summary');
  return res.json();
}
