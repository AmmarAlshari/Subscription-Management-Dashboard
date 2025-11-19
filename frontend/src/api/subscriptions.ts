import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// --- Types ---
export interface Subscription {
  id?: number;
  name: string;
  cost: number;
  billing_cycle: "monthly" | "yearly";
  start_date: string;
  renewal_date: string;
  is_active: boolean;
  category?: string;
}

// --- API Calls ---

// Get all subscriptions
export const getSubscriptions = async () => {
  return await axios.get<Subscription[]>(`${API_URL}/subscriptions/`);
};

// Add a subscription
export const createSubscription = async (data: Subscription) => {
  return await axios.post(`${API_URL}/subscriptions/`, data);
};

// Update a subscription
export const updateSubscription = async (id: number, data: Partial<Subscription>) => {
  return await axios.put(`${API_URL}/subscriptions/${id}/`, data);
};

// Delete a subscription
export const deleteSubscription = async (id: number) => {
  return await axios.delete(`${API_URL}/subscriptions/${id}/`);
};

// Get stats
export const getStats = async () => {
  return await axios.get(`${API_URL}/stats/`);
};
