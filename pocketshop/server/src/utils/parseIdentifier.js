export const parseIdentifier = (value) => {
  const identifier = String(value).trim();

  if (/^\d+$/.test(identifier)) {
    return { phone: identifier };
  }

  return {
    username: identifier.toLowerCase(),
  };
};