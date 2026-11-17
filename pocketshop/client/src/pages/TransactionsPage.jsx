import React from "react";
import { useEffect, useState } from "react";

import { getTransactions } from "../api/walletApi";

import Loader from "../components/Loader";

import { formatMoney } from "../utils/formatMoney";

import { formatDate } from "../utils/formatDate";

export default function TransactionsPage() {
  const [data, setData] = useState(null);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getTransactions(page)
      .then(setData)
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Transactions</h1>

      <div className="transaction-list">
        {data?.transactions?.map((transaction) => (
          <div className="transaction" key={transaction._id}>
            <div>
              <strong>{transaction.type}</strong>

              <p>{formatDate(transaction.createdAt)}</p>

              <small>Référence : {transaction.reference}</small>
            </div>

            <strong>
              {transaction.direction === "credit" ? "+" : "-"}
              {formatMoney(transaction.amount)}
            </strong>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Précédent
        </button>

        <span>
          Page {page} / {data?.pagination?.pages ?? 1}
        </span>

        <button
          disabled={page >= (data?.pagination?.pages ?? 1)}
          onClick={() => setPage(page + 1)}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
