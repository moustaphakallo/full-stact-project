import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { formatMoney } from "../utils/formatMoney";

export default function WalletPage() {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    refreshUser()
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [refreshUser]);

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Mon portefeuille</h1>
      <Alert message={error} />

      <div className="balance-card">
        <p>Solde disponible</p>

        <h2>{formatMoney(user?.balance || 0)}</h2>
      </div>

      <div className="actions">
        <Link className="btn" to="/wallet/fund">
          Recharger
        </Link>

        <Link className="btn" to="/wallet/send">
          Envoyer de l'argent
        </Link>

        <Link className="btn secondary" to="/wallet/transactions">
          Historique
        </Link>
      </div>
    </div>
  );
}
