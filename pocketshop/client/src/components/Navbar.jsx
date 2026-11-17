import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ user, onLogout, cartCount = 0 }) {
  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <header className="navbar">
      <Link className="navbar-brand" to="/">PocketShop</Link>
      <nav>
        <NavLink to="/" className={linkClass}>Produits</NavLink>
        {user && <NavLink to="/wallet" className={linkClass}>Portefeuille</NavLink>}
        {user && <NavLink to="/orders" className={linkClass}>Mes commandes</NavLink>}
        {user?.role === "admin" && <NavLink to="/admin" className={linkClass}>Administration</NavLink>}
        <NavLink to="/cart" className={linkClass}>
          Panier{cartCount > 0 ? ` (${cartCount})` : ""}
        </NavLink>
        {!user && <NavLink to="/login" className={linkClass}>Connexion</NavLink>}
        {user && (
          <button type="button" className="navbar-user" onClick={onLogout}>
            {user.fullName || user.username} · Déconnexion
          </button>
        )}
      </nav>
    </header>
  );
}