import { api } from "./client";

export const createOrder = (items) => api.post("/orders", { items }).then(({ data }) => data);
export const getOrders = () => api.get("/orders").then(({ data }) => data);
export const getMyOrders = getOrders;
export const getOrder = (id) => api.get(`/orders/${id}`).then(({ data }) => data);
export const payOrder = (id, pin) => api.post(`/orders/${id}/pay`, { pin }).then(({ data }) => data);
export const cancelOrder = (id) => api.patch(`/orders/${id}/cancel`).then(({ data }) => data);