import React from "react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { getMyOrders } from "../api/orderApi";

import { formatMoney } from "../utils/formatMoney";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then((data) => setOrders(data.orders));
  }, []);

  return (
    <div>
      <h1>Mes commandes</h1>

      {orders.map((order) => (
        <div className="card" key={order._id}>
          <h3>Commande #{order._id.slice(-6)}</h3>

          <p>Total : {formatMoney(order.total)}</p>

          <p>Statut : {order.status}</p>

          <Link to={`/orders/${order._id}`}>Voir la commande</Link>
        </div>
      ))}
    </div>
  );
}
