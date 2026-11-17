import React from "react";
import { useEffect, useState } from "react";

import { getProducts } from "../api/productApi";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((data) => {
        const productList = Array.isArray(data) ? data : data?.products;

        if (!Array.isArray(productList)) {
          throw new Error(
            "Réponse API invalide. Vérifiez VITE_API_URL et la disponibilité du backend.",
          );
        }

        setProducts(productList);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <section className="hero">
        <h1>Bienvenue sur PocketShop</h1>

        <p>Achetez vos produits et payez avec votre portefeuille.</p>
      </section>

      <Alert message={error} />

      <h2>Produits</h2>
      {cartMessage && (
        <Alert type="success" className="cart-notice">
          <span>{cartMessage}</span>{" "}
          <Link to="/cart">Voir mon panier</Link>
        </Alert>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAdd={(selectedProduct) => {
                addToCart(selectedProduct);
                setCartMessage(`${selectedProduct.name} a été ajouté au panier.`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
