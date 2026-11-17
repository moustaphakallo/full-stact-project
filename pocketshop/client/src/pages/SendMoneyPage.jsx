import React from "react";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { lookupUser } from "../api/userApi";

import { transferMoney } from "../api/walletApi";

import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default function SendMoneyPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [recipient, setRecipient] = useState("");

  const [amount, setAmount] = useState("");

  const [note, setNote] = useState("");

  const [foundUser, setFoundUser] = useState(null);

  const [pin, setPin] = useState("");

  const [error, setError] = useState("");

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const findRecipient = async () => {
    setError("");

    try {
      const data = await lookupUser(recipient);

      setFoundUser(data.user);

      setStep(2);
    } catch (error) {
      setError(error.message);
    }
  };

  const send = async () => {
    setError("");
    setLoading(true);

    try {
      const data = await transferMoney({
        recipient: foundUser.username,

        amount: Number(amount),

        pin,

        note,
      });

      alert(`Transfert réussi ! Référence : ${data.reference}`);

      navigate("/wallet");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h1>Envoyer de l'argent</h1>

        <Alert message={error} />

        {step === 1 && (
          <>
            <Input
              label="Téléphone ou username"
              name="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="08012345678 ou moussa"
            />

            <Input
              label="Montant"
              name="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Input
              label="Note"
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <p>Votre solde : {user?.balance}</p>

            <Button onClick={findRecipient}>Continuer</Button>
          </>
        )}

        {step === 2 && foundUser && (
          <>
            <div className="recipient-box">
              <h3>Destinataire</h3>

              <p>{foundUser.fullName}</p>

              <p>@{foundUser.username}</p>

              <p>{foundUser.phone}</p>
            </div>

            <Input
              label="PIN"
              name="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="1234"
            />

            <Button onClick={send} disabled={loading}>
              {loading ? "Envoi..." : "Envoyer"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
