import React from "react";
export default function StatCard({ title, label, value, icon, children }) {
  return (
    <section className="stat-card card">
      {icon && <span className="stat-card-icon">{icon}</span>}
      <div>
        <p>{title ?? label}</p>
        <strong>{value}</strong>
        {children}
      </div>
    </section>
  );
}