// js/dateManager.js

/**
 * Calcula a diferença em dias entre a data de hoje (meia-noite) e a data de validade fornecida.
 * @param {string} expiryDateStr - Data no formato YYYY-MM-DD
 * @returns {number} - Diferença de dias (Negativo = Vencido, 0 = Vence hoje, Positivo = Dias restantes)
 */
export function calculateDaysToExpiry(expiryDateStr) {
  if (!expiryDateStr) return 0;
  
  // Cria a data de validade com base na string inserida
  const expiryParts = expiryDateStr.split('-');
  const expiryDate = new Date(expiryParts[0], expiryParts[1] - 1, expiryParts[2]);
  expiryDate.setHours(0, 0, 0, 0);

  // Data atual exata à meia-noite
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = expiryDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Retorna as classes CSS e os textos adequados com base na urgência da validade.
 * @param {number} days - Dias restantes até o vencimento
 * @returns {object} - Objeto contendo { text, colorClass }
 */
export function getExpiryStatus(days) {
  if (days < 0) {
    const passedDays = Math.abs(days);
    return {
      text: `Vencido há ${passedDays} ${passedDays === 1 ? 'dia' : 'dias'}`,
      colorClass: 'badge-expired'
    };
  }
  if (days === 0) {
    return {
      text: 'Vence Hoje!',
      colorClass: 'badge-urgent'
    };
  }
  if (days === 1) {
    return {
      text: 'Vence Amanhã',
      colorClass: 'badge-urgent'
    };
  }
  if (days <= 3) {
    return {
      text: `Vence em ${days} dias`,
      colorClass: 'badge-warning'
    };
  }
  
  return {
    text: `Vence em ${days} dias`,
    colorClass: 'badge-safe'
  };
}