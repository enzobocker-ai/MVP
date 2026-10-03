// js/dateManager.js

export function calculateDaysToExpiry(expiryDateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const expiryDate = new Date(expiryDateString);
  expiryDate.setHours(0, 0, 0, 0);

  const timeDifference = expiryDate.getTime() - today.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
}

export function getExpiryStatus(days) {
  if (days < 0) return { text: 'Vencido', colorClass: 'badge-expired' };
  if (days <= 3) return { text: `Vence em ${days} dias`, colorClass: 'badge-urgent' };
  if (days <= 7) return { text: `Vence em ${days} dias`, colorClass: 'badge-warning' };
  return { text: `Vence em ${days} dias`, colorClass: 'badge-safe' };
}