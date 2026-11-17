import React from "react";
import { formatMoney } from "../utils/formatMoney";

export default function OrderSummary({ order, items = [], total, children }) {
  const orderItems = order?.items ?? items;
  const orderTotal = total ?? order?.total ?? 0;

  return (
    <section className="order-summary card">
      <h2>Résumé de la commande</h2>
      <div className="order-summary-items">
        {orderItems.map((item, index) => (
          <div key={item._id ?? `${item.name}-${index}`} className="order-summary-item">
            <span>{item.name} × {item.quantity}</span>
            <strong>{formatMoney((item.price ?? 0) * (item.quantity ?? 1))}</strong>
          </div>
        ))}
      </div>
      <div className="order-summary-total">
        <span>Total</span>
        <strong>{formatMoney(orderTotal)}</strong>
      </div>
      {children}
    </section>
  );
}