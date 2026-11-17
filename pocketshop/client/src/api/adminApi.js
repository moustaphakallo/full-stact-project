import { api } from "./client";

export const getAdminStats = () => api.get("/admin/stats").then(({ data }) => data);
export const getAdminUsers = () => api.get("/admin/users").then(({ data }) => data);
export const getAdminOrders = () => api.get("/admin/orders").then(({ data }) => data);
export const getAdminTransactions = () => api.get("/admin/transactions").then(({ data }) => data);