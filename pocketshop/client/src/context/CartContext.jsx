import React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "pocketshop_cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return [];

    try {
      const parsedCart = JSON.parse(savedCart);
      if (Array.isArray(parsedCart)) return parsedCart;
      throw new Error("Le panier enregistré n'est pas une liste.");
    } catch (error) {
      console.error("Impossible de restaurer le panier enregistré :", error);
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const productId = product._id ?? product.id;
    setCart((current) => {
      const existing = current.find((item) => item.product === productId);
      if (existing) {
        return current.map((item) =>
          item.product === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...current,
        {
          product: productId,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCart((current) => current.filter((item) => item.product !== productId));
      return;
    }
    setCart((current) =>
      current.map((item) => item.product === productId ? { ...item, quantity } : item),
    );
  };

  const removeFromCart = (productId) =>
    setCart((current) => current.filter((item) => item.product !== productId));
  const clearCart = () => setCart([]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0),
    [cart],
  );
  const itemCount = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item.quantity), 0),
    [cart],
  );

  return (
    <CartContext.Provider
      value={{ cart, total, itemCount, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans CartProvider");
  }
  return context;
}