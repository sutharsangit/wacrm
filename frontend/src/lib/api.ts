/**
 * Central API Client utility for fetch requests.
 * Automatically injects JWT authorization headers and handles JSON responses.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  // Retrieve token from localStorage if on client side
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}
