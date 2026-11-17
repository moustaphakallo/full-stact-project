import React from "react";
import { useEffect, useState } from "react";

import { getAdminUsers } from "../api/adminApi";

import { formatMoney } from "../utils/formatMoney";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAdminUsers().then((data) => setUsers(data.users));
  }, []);

  return (
    <div>
      <h1>Utilisateurs</h1>

      {users.map((user) => (
        <div className="card" key={user._id}>
          <h3>{user.fullName}</h3>

          <p>@{user.username}</p>

          <p>Téléphone : {user.phone}</p>

          <p>Solde : {formatMoney(user.balance)}</p>

          <p>Rôle : {user.role}</p>
        </div>
      ))}
    </div>
  );
}
