import { api } from "./client";

export const getProducts = () => api.get("/products").then(({ data }) => data);
export const getProduct = (id) => api.get(`/products/${id}`).then(({ data }) => data);
export const getAdminProducts = () => api.get("/products/admin/all").then(({ data }) => data);
export const createProduct = (product) => api.post("/products", product).then(({ data }) => data);
export const updateProduct = (id, product) => api.patch(`/products/${id}`, product).then(({ data }) => data);
export const hideProduct = (id) => api.delete(`/products/${id}`).then(({ data }) => data);
export const showProduct = (id) => api.patch(`/products/${id}/show`).then(({ data }) => data);