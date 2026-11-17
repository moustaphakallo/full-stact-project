import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-content">
        <div>
          <Link className="site-footer-brand" to="/">PocketShop</Link>
          <p>Achetez simplement et payez avec votre portefeuille.</p>
        </div>
        <nav aria-label="Liens de pied de page">
          <Link to="/">Produits</Link>
          <Link to="/cart">Panier</Link>
          <Link to="/login">Connexion</Link>
        </nav>
        <div className="site-footer-socials" aria-label="Réseaux sociaux">
          <a href="https://wa.me/224661615859" target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="mailto:moustaphakallo547@gmail.com">E-mail</a>
        </div>
        <small>© {new Date().getFullYear()} PocketShop. Tous droits réservés.</small>
      </div>
    </footer>
  );
}
