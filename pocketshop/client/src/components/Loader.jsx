import React from "react";
export default function Loader({ label = "Chargement..." }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader-spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}