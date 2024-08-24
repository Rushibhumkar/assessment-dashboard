import axios from "axios";

// Mock API service (Replace with real backend endpoint later)
const API_BASE_URL = "http://localhost:5000/api";

export const getAssessments = () => axios.get(`${API_BASE_URL}/assessments`);
export const getRecentActivities = () =>
  axios.get(`${API_BASE_URL}/recent-activities`);
export const getAnalyticsSummary = () =>
  axios.get(`${API_BASE_URL}/analytics-summary`);
