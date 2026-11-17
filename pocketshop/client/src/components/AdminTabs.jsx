import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminTabs.css";

function AdminTabs() {
  const tabs = [
    {
      label: "Dashboard",
      path: "/admin",
    },
    {
      label: "Produits",
      path: "/admin/products",
    },
    {
      label: "Commandes",
      path: "/admin/orders",
    },
    {
      label: "Utilisateurs",
      path: "/admin/users",
    },
    {
      label: "Transactions",
      path: "/admin/transactions",
    },
  ];

  return (
    <div className="admin-tabs">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === "/admin"}
          className={({ isActive }) => `admin-tab ${isActive ? "active" : ""}`}
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}

export default AdminTabs;
