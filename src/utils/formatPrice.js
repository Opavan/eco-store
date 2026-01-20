export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

export const formatCarbon = (carbon) => {
  return `${carbon.toFixed(1)} kg CO₂`;
};

export const calculateShipping = (subtotal) => {
  return subtotal > 50 ? 0 : 5.99;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};