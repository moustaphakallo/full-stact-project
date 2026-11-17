import React from "react";
import { formatMoney } from "../utils/formatMoney";

export default function BalanceCard({
  balance = 0,
  amount,
  title = "Solde disponible",
  children,
}) {
  const value = amount ?? balance;

  return (
    <section className="balance-card card">
      <p>{title}</p>
      <strong className="balance-card-value">
        {typeof value === "number" ? formatMoney(value) : value}
      </strong>
      {children}
    </section>
  );
}