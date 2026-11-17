import React from "react";
const labels = {
  pending: "En attente",
  paid: "Payée",
  cancelled: "Annulée",
};

export default function OrderStatusBadge({ status }) {
  const normalizedStatus = status || "pending";

  return (
    <span className={`status-badge status-${normalizedStatus}`}>
      {labels[normalizedStatus] || status}
    </span>
  );
}