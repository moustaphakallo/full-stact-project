import nodemailer from "nodemailer";

export const sendOrderNotification = async (order, customer) => {
  const requiredConfig = [
    "SHOP_NOTIFICATION_EMAIL",
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASSWORD",
  ];
  const missingConfig = requiredConfig.filter((key) => !process.env[key]?.trim());

  if (missingConfig.length > 0) {
    throw new Error(`Missing email configuration: ${missingConfig.join(", ")}`);
  }

  const port = Number(process.env.SMTP_PORT || 587);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid port number");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const itemLines = order.items.map(
    (item) => `- ${item.name} x${item.quantity} (${item.price} each)`,
  );
  const text = [
    "Nouvelle commande PocketShop",
    `Commande : ${order._id}`,
    `Client : ${customer.fullName || customer.username}`,
    `Nom utilisateur : ${customer.username}`,
    `Téléphone : ${customer.phone || "Non renseigné"}`,
    "",
    "Produits demandés :",
    ...itemLines,
    "",
    `Total : ${order.total}`,
    "Statut : en attente de paiement",
  ].join("\n");

  await transporter.sendMail({
    from: process.env.SHOP_EMAIL_FROM?.trim() || process.env.SMTP_USER,
    to: process.env.SHOP_NOTIFICATION_EMAIL,
    subject: `Nouvelle commande PocketShop ${order._id}`,
    text,
  });
};
