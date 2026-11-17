import React from "react";
export default function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  name,
  error,
  required = false,
  min,
  max,
  className = "",
  id,
}) {
  const inputId = id ?? name;

  return (
    <label className="field">
      {label && <span>{label}</span>}

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className={className}
        aria-invalid={Boolean(error)}
      />
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}
