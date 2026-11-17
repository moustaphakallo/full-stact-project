export const generateReference = () => {
  const random = Math.random().toString(36).slice(2, 10).toUpperCase();
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");

  return `PS-${date}-${random.slice(0, 6)}`;
};