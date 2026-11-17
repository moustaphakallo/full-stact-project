import React from "react";
export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  variant,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn ${variant ? variant : ""} ${className}`.trim()}
      {...props}
    >
      {loading ? "Chargement..." : children}
    </button>
  );
}
