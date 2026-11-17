import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { fundWallet } from "../api/walletApi";

import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default function FundWalletPage() {
  const [amount, setAmount] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await fundWallet({ amount: Number(amount) });

      alert("Recharge réussie");

      navigate("/wallet");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <form className="form-card" onSubmit={submit}>
        <h1>Recharger</h1>

        <Alert message={error} />

        <Input
          label="Montant"
          name="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="10000"
        />

        <p>Minimum : 100</p>

        <p>Maximum : 100000</p>

        <Button type="submit" disabled={loading}>
          {loading ? "Recharge..." : "Recharger"}
        </Button>
      </form>
    </div>
  );
}
