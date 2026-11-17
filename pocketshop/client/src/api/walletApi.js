import { api } from "./client";

export const getBalance = () => api.get("/wallet/balance").then(({ data }) => data);
export const fundWallet = (payload) => api.post("/wallet/fund", payload).then(({ data }) => data);
export const transferMoney = (payload) => api.post("/wallet/transfer", payload).then(({ data }) => data);
export const getTransactions = (page = 1) => api.get("/wallet/transactions", { params: { page } }).then(({ data }) => data);