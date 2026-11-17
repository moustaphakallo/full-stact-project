import React from "react";
export default function Modal({
  isOpen,
  open,
  onClose,
  title,
  children,
  footer,
}) {
  const visible = open ?? isOpen;

  if (!visible) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal card"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          {title && <h2>{title}</h2>}
          {onClose && (
            <button type="button" className="modal-close" onClick={onClose} aria-label="Fermer">
              &times;
            </button>
          )}
        </header>
        <div className="modal-content">{children}</div>
        {footer && <footer className="modal-footer">{footer}</footer>}
      </section>
    </div>
  );
}