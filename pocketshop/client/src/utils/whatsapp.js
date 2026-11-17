const WHATSAPP_NUMBER = "224661615859";

export function getProductWhatsAppUrl(productName) {
  const message = `Bonjour, je suis intéressé(e) par le produit : ${productName}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
