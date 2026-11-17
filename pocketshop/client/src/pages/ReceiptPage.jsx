import React from "react";
import { Link, useParams } from "react-router-dom";
import OrderDetailPage from "./OrderDetailPage";

export default function ReceiptPage() {
  const { id } = useParams();

  return (
    <section>
      <div style={{ marginBottom: "20px" }}>
        <Link to={`/orders/${id}`}>&larr; Retour à la commande</Link>
      </div>
      <OrderDetailPage />
    </section>
  );
}