import React from "react";
import { useEffect, useState } from "react";

import { getAdminOrders } from "../api/adminApi";

import { formatMoney } from "../utils/formatMoney";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminOrders()
      .then((data) => setOrders(data.orders))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Commandes</h1>

      <Alert message={error} />

      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <p>Aucune commande pour le moment.</p>
      ) : (
        orders.map((order) => (
          <div className="card admin-order-card" key={order._id}>
            <h3>Client : {order.user?.fullName || "Client"}</h3>

            <p>Username : {order.user?.username || "Non disponible"}</p>

            {order.user?.phone && <p>Téléphone : {order.user.phone}</p>}

            <p>Total : {formatMoney(order.total)}</p>

            <p>Statut : {order.status === "paid" ? "Payée" : order.status === "pending" ? "En attente" : order.status}</p>

            <h4>Produits demandés</h4>
            {order.items.map((item) => (
              <p key={item.product}>
                {item.name} × {item.quantity}
              </p>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
