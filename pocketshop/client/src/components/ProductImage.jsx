import React, { useEffect, useState } from "react";
import { getProductWhatsAppUrl } from "../utils/whatsapp";

export default function ProductImage({ src, alt, className = "" }) {
  const [unavailable, setUnavailable] = useState(!src);
  const whatsappUrl = getProductWhatsAppUrl(alt);

  useEffect(() => {
    setUnavailable(!src);
  }, [src]);

  if (unavailable) {
    return (
      <a
        className={`${className} product-image-placeholder`}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Contacter WhatsApp au sujet de ${alt}`}
      >
        Image indisponible
      </a>
    );
  }

  return (
    <a
      className="product-image-link"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contacter WhatsApp au sujet de ${alt}`}
    >
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setUnavailable(true)}
      />
    </a>
  );
}
