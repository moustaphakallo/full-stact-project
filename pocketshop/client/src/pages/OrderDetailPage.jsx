import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOrder } from "../api/orderApi";
import Loader from "../components/Loader";
import OrderStatusBadge from "../components/OrderStatusBadge";
import { formatDate } from "../utils/formatDate";
import { formatMoney } from "../utils/formatMoney";

const merchantEmail = "moustaphakallo547@gmail.com";
const merchantWhatsApp = "224661615859";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrder(id)
      .then((data) => setOrder(data.order))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="alert">{error}</div>;
  if (!order) return null;

  const message = [
    `Bonjour, je vous contacte au sujet de ma commande PocketShop ${order._id}.`,
    ...order.items.map((item) => `${item.name} x${item.quantity}`),
    `Total : ${formatMoney(order.total)}`,
  ].join("\n");
  const whatsappUrl = `https://wa.me/${merchantWhatsApp}?text=${encodeURIComponent(message)}`;
  const emailUrl = `mailto:${merchantEmail}?subject=${encodeURIComponent(`Commande PocketShop ${order._id}`)}&body=${encodeURIComponent(message)}`;

  return (
    <section>
      <h1>Commande {order._id}</h1>
      <OrderStatusBadge status={order.status} />
      <p>Créée le {formatDate(order.createdAt)}</p>
      <div className="card" style={{ marginTop: "20px", padding: "20px" }}>
        {order.items.map((item) => (
          <div key={item._id ?? item.product} className="transaction">
            <span>{item.name} × {item.quantity}</span>
            <strong>{formatMoney(item.price * item.quantity)}</strong>
          </div>
        ))}
        <h2>Total : {formatMoney(order.total)}</h2>
      </div>
      <Link className="btn" to={`/orders/${id}/receipt`} style={{ marginTop: "20px" }}>
        Voir le reçu
      </Link>
      <div className="actions order-contact-actions">
        <a className="btn" href={whatsappUrl} target="_blank" rel="noreferrer">
          Contacter le commerçant sur WhatsApp
        </a>
        <a className="btn secondary" href={emailUrl}>
          Contacter le commerçant par e-mail
        </a>
      </div>
    </section>
  );
}