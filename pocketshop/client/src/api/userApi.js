import { api } from "./client";

export const searchUser = (query) => api.get("/users/search", { params: { query } }).then(({ data }) => data);
export const lookupUser = (query) => api.get("/users/lookup", { params: { query } }).then(({ data }) => data);