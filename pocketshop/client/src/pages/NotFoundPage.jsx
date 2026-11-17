import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="center">
      <h1>404</h1>

      <p>Page introuvable.</p>

      <Link className="btn" to="/">
        Retour
      </Link>
    </div>
  );
}
