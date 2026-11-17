import React from "react";
import { useRef } from "react";

export default function PinInput({
  length = 4,
  value = "",
  onChange,
  label = "PIN",
}) {
  const inputs = Array.from({ length }, (_, index) => index);
  const refs = useRef([]);

  const updateDigit = (index, digit) => {
    const digits = value.padEnd(length, " ").split("");
    digits[index] = digit.slice(-1);
    onChange?.(digits.join("").replace(/ /g, ""));
  };

  return (
    <fieldset className="pin-input">
      <legend>{label}</legend>
      <div>
        {inputs.map((index) => (
          <input
            key={index}
            ref={(element) => { refs.current[index] = element; }}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={value[index] ?? ""}
            onChange={(event) => {
              const digit = event.target.value.replace(/\D/g, "");
              updateDigit(index, digit);
              if (digit && refs.current[index + 1]) {
                refs.current[index + 1].focus();
              }
            }}
          />
        ))}
      </div>
    </fieldset>
  );
}