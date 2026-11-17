import React from "react";
export default function EmptyState({
  title = "Aucun résultat",
  message,
  children,
  action,
}) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      {message && <p>{message}</p>}
      {action}
      {children}
    </div>
  );
}