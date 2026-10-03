// js/inventory.js
import { calculateDaysToExpiry, getExpiryStatus } from './dateManager.js';

// Dados simulados baseados na interface do protótipo
const foodsData = [
  { id: '1', name: 'Alface', expiryDate: '2026-10-05', location: 'Na geladeira', icon: '🥬' },
  { id: '2', name: 'Tomate', expiryDate: '2026-10-08', location: 'Na geladeira', icon: '🍅' },
  { id: '3', name: 'Iogurte natural', expiryDate: '2026-10-07', location: 'Na geladeira', icon: '🥛' },
  { id: '4', name: 'Pão de forma', expiryDate: '2026-10-10', location: 'Na despensa', icon: '🍞' }
];

function renderInventory() {
  const container = document.getElementById('food-list');
  container.innerHTML = '';

  foodsData.forEach(food => {
    const days = calculateDaysToExpiry(food.expiryDate);
    const status = getExpiryStatus(days);

    const card = document.createElement('div');
    card.className = 'food-card';
    card.innerHTML = `
      <div class="food-icon">${food.icon}</div>
      <div class="food-info">
        <h3>${food.name}</h3>
        <p class="food-expiry ${status.colorClass}">${status.text}</p>
        <span class="location-tag">${food.location}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderInventory);