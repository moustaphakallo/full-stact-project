import React from "react";
import { formatDate } from "../utils/formatDate";
import { formatMoney } from "../utils/formatMoney";

export default function TransactionItem({ transaction }) {
  const isCredit = transaction.direction === "credit";

  return (
    <article className="transaction">
      <div>
        <strong>{transaction.type}</strong>
        <p>{formatDate(transaction.createdAt)}</p>
        {transaction.reference && <small>Référence : {transaction.reference}</small>}
      </div>
      <strong className={isCredit ? "transaction-credit" : "transaction-debit"}>
        {isCredit ? "+" : "-"}{formatMoney(transaction.amount)}
      </strong>
    </article>
  );
}
