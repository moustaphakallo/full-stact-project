import React from "react";
export default function QuantitySelector({
  value = 1,
  quantity,
  min = 1,
  max,
  onChange,
}) {
  const currentValue = quantity ?? value;

  const change = (nextValue) => {
    const normalized = Math.max(min, Number.isFinite(nextValue) ? nextValue : min);
    onChange?.(max === undefined ? normalized : Math.min(normalized, max));
  };

  return (
    <div className="quantity-selector">
      <button type="button" onClick={() => change(currentValue - 1)} disabled={currentValue <= min}>-</button>
      <input
        type="number"
        min={min}
        max={max}
        value={currentValue}
        onChange={(event) => change(Number(event.target.value))}
        aria-label="Quantité"
      />
      <button type="button" onClick={() => change(currentValue + 1)} disabled={max !== undefined && currentValue >= max}>+</button>
    </div>
  );
}