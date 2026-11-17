import { api } from "./client";

export const login = (credentials) => api.post("/auth/login", credentials).then(({ data }) => data);
export const register = (user) => api.post("/auth/register", user).then(({ data }) => data);
export const getCurrentUser = () => api.get("/auth/me").then(({ data }) => data);