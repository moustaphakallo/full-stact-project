import React from "react";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";

import { useAuth } from "../context/AuthContext";

import { createOrder, payOrder } from "../api/orderApi";

import { formatMoney } from "../utils/formatMoney";
import ProductImage from "../components/ProductImage";

export default function CartPage() {
  const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();

  const { user } = useAuth();

  const [pin, setPin] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const checkout = async () => {
    if (!user) {
      navigate("/login");

      return;
    }

    setLoading(true);

    try {
      const order = await createOrder(
        cart.map((item) => ({
          product: item.product,

          quantity: item.quantity,
        })),
      );

      await payOrder(order.order._id, pin);

      clearCart();

      alert("Commande payée avec succès");

      navigate(`/orders/${order.order._id}`);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <h1>Votre panier</h1>

        <p>Votre panier est vide.</p>

        <Link className="btn" to="/">
          Voir les produits
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Votre panier</h1>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.product}>
            <ProductImage
              src={item.imageUrl}
              alt={item.name}
              className="cart-item-image"
            />

            <div>
              <h3>{item.name}</h3>

              <p>{formatMoney(item.price)}</p>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.product, Number(e.target.value))
                }
              />

              <button onClick={() => removeFromCart(item.product)}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout">
        <h2>Total : {formatMoney(total)}</h2>

        {user ? (
          <>
            <label>PIN pour payer</label>

            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="1234"
            />

            <button className="btn" disabled={loading} onClick={checkout}>
              {loading ? "Paiement..." : "Payer avec mon wallet"}
            </button>
          </>
        ) : (
          <Link className="btn" to="/login">
            Se connecter pour payer
          </Link>
        )}
      </div>
    </div>
  );
}
