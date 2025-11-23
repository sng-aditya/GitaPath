// API Configuration
// Works both in deployment (with env vars) and locally (fallback to localhost)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
