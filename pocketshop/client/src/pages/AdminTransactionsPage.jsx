import React from "react";
import { useEffect, useState } from "react";

import { getAdminTransactions } from "../api/adminApi";

import { formatMoney } from "../utils/formatMoney";

import { formatDate } from "../utils/formatDate";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAdminTransactions().then((data) => setTransactions(data.transactions));
  }, []);

  return (
    <div>
      <h1>Transactions</h1>

      {transactions.map((transaction) => (
        <div className="card" key={transaction._id}>
          <p>Type : {transaction.type}</p>

          <p>Montant : {formatMoney(transaction.amount)}</p>

          <p>Référence : {transaction.reference}</p>

          <p>Direction : {transaction.direction}</p>

          <p>Date : {formatDate(transaction.createdAt)}</p>
        </div>
      ))}
    </div>
  );
}
