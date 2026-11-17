import React from "react";
import TransactionItem from "./TransactionItem";

export default function TransactionList({ transactions = [] }) {
  if (transactions.length === 0) {
    return <p className="empty-state">Aucune transaction.</p>;
  }

  return (
    <div className="transaction-list">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction._id ?? transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}