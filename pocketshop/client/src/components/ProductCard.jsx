import React from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";
import ProductImage from "./ProductImage";

export default function ProductCard({ product, onAdd }) {
  const id = product._id ?? product.id;

  return (
    <article className="product-card card">
      <ProductImage
        src={product.imageUrl}
        alt={product.name}
        className="product-card-image"
      />
      <div className="product-card-content">
        <Link to={`/products/${id}`}><h3>{product.name}</h3></Link>
        <p>{formatMoney(product.price)}</p>
        <small>{product.stock > 0 ? `${product.stock} en stock` : "Indisponible"}</small>
        <button
          type="button"
          className="btn"
          disabled={product.stock <= 0}
          onClick={() => onAdd?.(product)}
        >
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}