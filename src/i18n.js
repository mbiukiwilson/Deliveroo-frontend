export function formatMoney(amount) {
  return `$${Number(amount || 0).toFixed(2)}`;
}

export function t(key) {
  return key;
}
