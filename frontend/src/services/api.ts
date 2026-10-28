import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

// No requests are made in Phase 1. Authentication is intentionally not configured.
