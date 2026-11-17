import React from "react";
export default function Alert({
  message,
  type = "error",
  children,
  onClose,
  className = "",
}) {
  const content = message ?? children;

  if (!content) {
    return null;
  }

  return (
    <div
      className={`alert alert-${type} ${className}`.trim()}
      role={type === "error" ? "alert" : "status"}
    >
      <span>{content}</span>
      {onClose && (
        <button type="button" className="alert-close" onClick={onClose} aria-label="Fermer">
          &times;
        </button>
      )}
    </div>
  );
}
