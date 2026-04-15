// src/services/profileService.js
// Handles API calls for profile page

const API_URL = 'http://localhost:5000/profile';

function getToken() {
  return localStorage.getItem('token');
}

export async function fetchProfile() {
  const res = await fetch(API_URL, {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export async function updateProfile(name) {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    },
    body: JSON.stringify({ name })
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}

export async function changePassword(currentPwd, newPwd) {
  const res = await fetch(API_URL + '/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    },
    body: JSON.stringify({ currentPwd, newPwd })
  });
  if (!res.ok) throw new Error('Failed to update password');
  return res.json();
}
