export function formatMoney(amount) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return "0 F";
  }

  return `${new Intl.NumberFormat("fr-FR").format(value)} F`;
}

export default formatMoney;