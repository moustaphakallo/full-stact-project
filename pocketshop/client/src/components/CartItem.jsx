import React from "react";
import { formatMoney } from "../utils/formatMoney";
import QuantitySelector from "./QuantitySelector";
import ProductImage from "./ProductImage";

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const productId = item.product ?? item._id;

  return (
    <article className="cart-item card">
      <ProductImage
        src={item.imageUrl}
        alt={item.name || "Produit"}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>{formatMoney(item.price)}</p>
        <QuantitySelector
          value={item.quantity ?? 1}
          onChange={(quantity) => onQuantityChange?.(productId, quantity)}
        />
      </div>
      {onRemove && (
        <button type="button" className="btn secondary" onClick={() => onRemove(productId)}>
          Supprimer
        </button>
      )}
    </article>
  );
}