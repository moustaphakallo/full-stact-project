import React from "react";
import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { getProduct } from "../api/productApi";

import { useCart } from "../context/CartContext";

import { formatMoney } from "../utils/formatMoney";
import ProductImage from "../components/ProductImage";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError("");
    getProduct(id)
      .then((data) => setProduct(data.product))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Alert message={error} />;
  if (!product) return null;

  return (
    <div className="product-detail">
      <ProductImage
        src={product.imageUrl}
        alt={product.name}
        className="product-detail-image"
      />

      <div>
        <h1>{product.name}</h1>

        <p>{product.description}</p>

        <h2>{formatMoney(product.price)}</h2>

        <p>Stock : {product.stock}</p>

        <input
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
        />

        {cartMessage && (
          <Alert type="success" className="cart-notice">
            <span>{cartMessage}</span>{" "}
            <Link to="/cart">Voir mon panier</Link>
          </Alert>
        )}

        <button
          className="btn"
          disabled={product.stock === 0 || !quantity || quantity < 1 || quantity > product.stock}
          onClick={() => {
            addToCart(product, quantity);
            setCartMessage(`${product.name} a été ajouté au panier.`);
          }}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
