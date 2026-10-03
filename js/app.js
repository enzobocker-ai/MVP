// js/app.js
import { calculateDaysToExpiry, getExpiryStatus } from './dateManager.js';
import { defaultFoods, offersData as initialOffers, recipesData } from './data.js';

// ----------------------------------------------------
// ESTADO GLOBAL DA APLICAÇÃO
// ----------------------------------------------------
let foodsData = JSON.parse(localStorage.getItem('my_foods')) || defaultFoods;
let offersData = JSON.parse(localStorage.getItem('my_offers')) || initialOffers;
let profileData = JSON.parse(localStorage.getItem('my_profile')) || { name: 'Maria', tag: 'Consumidor Consciente 🌿' };
let favoriteRecipeIds = JSON.parse(localStorage.getItem('my_favorite_recipes')) || [];
let totalSavedMoney = parseFloat(localStorage.getItem('my_saved_money')) || 0.00;
let savedItemsCount = parseInt(localStorage.getItem('my_saved_items_count')) || 0;

// Estado do Modo Vendedor & Mercado Parceiro
let isSellerMode = JSON.parse(localStorage.getItem('my_seller_mode')) || false;
let marketData = JSON.parse(localStorage.getItem('my_market_data')) || null;

let currentFilter = 'Todos';
let currentRecipeFilter = 'todas';
let currentOfferFilter = 'Todos';
let searchQuery = '';
let selectedOffer = null;
let currentViewingRecipe = null;

// ----------------------------------------------------
// PERSISTÊNCIA DE DADOS (LOCALSTORAGE)
// ----------------------------------------------------
function saveState() {
  localStorage.setItem('my_foods', JSON.stringify(foodsData));
  localStorage.setItem('my_offers', JSON.stringify(offersData));
  localStorage.setItem('my_profile', JSON.stringify(profileData));
  localStorage.setItem('my_favorite_recipes', JSON.stringify(favoriteRecipeIds));
  localStorage.setItem('my_saved_money', totalSavedMoney.toFixed(2));
  localStorage.setItem('my_saved_items_count', savedItemsCount.toString());
  
  localStorage.setItem('my_seller_mode', JSON.stringify(isSellerMode));
  localStorage.setItem('my_market_data', JSON.stringify(marketData));
}

// ----------------------------------------------------
// PERFIL & MODO ESTABELECIMENTO PARCEIRO
// ----------------------------------------------------
function updateProfileStats() {
  const homeGreeting = document.getElementById('home-greeting');
  const profileNameDisplay = document.getElementById('profile-name-display');
  const profileTagDisplay = document.getElementById('profile-tag-display');

  if (homeGreeting) homeGreeting.textContent = `Olá, ${profileData.name}!`;
  if (profileNameDisplay) profileNameDisplay.textContent = profileData.name;
  if (profileTagDisplay) profileTagDisplay.textContent = profileData.tag;

  const statSavedItems = document.getElementById('stat-saved-items');
  const statMoneySaved = document.getElementById('stat-money-saved');
  const statRecipesCount = document.getElementById('stat-recipes-count');

  if (statSavedItems) statSavedItems.textContent = savedItemsCount;
  if (statMoneySaved) statMoneySaved.textContent = `R$ ${totalSavedMoney.toFixed(2).replace('.', ',')}`;
  if (statRecipesCount) statRecipesCount.textContent = recipesData.length;

  // Atualização da Interface do Modo Vendedor
  const toggleSellerMode = document.getElementById('toggle-seller-mode');
  const sellerDashboard = document.getElementById('seller-dashboard');
  const openAddOfferBtnHeader = document.getElementById('open-add-offer-modal-btn');

  if (toggleSellerMode) toggleSellerMode.checked = isSellerMode;

  if (isSellerMode) {
    sellerDashboard?.classList.remove('hidden');
    if (openAddOfferBtnHeader) openAddOfferBtnHeader.style.display = 'block';

    if (marketData) {
      document.getElementById('seller-market-name').textContent = `${marketData.icon} ${marketData.name}`;
      document.getElementById('seller-market-loc').textContent = `${marketData.bairro}`;
    } else {
      document.getElementById('seller-market-name').textContent = 'Nenhum mercado cadastrado';
      document.getElementById('seller-market-loc').textContent = 'Clique em editar para cadastrar seu mercado';
    }
  } else {
    sellerDashboard?.classList.add('hidden');
    if (openAddOfferBtnHeader) openAddOfferBtnHeader.style.display = 'none';
  }
}

// Alternar Modo Vendedor no Perfil
document.getElementById('toggle-seller-mode')?.addEventListener('change', (e) => {
  isSellerMode = e.target.checked;

  if (isSellerMode && !marketData) {
    openMarketRegisterModal();
  } else {
    saveState();
    updateProfileStats();
  }
});

// Modal do Cadastro do Mercado
const registerMarketModal = document.getElementById('register-market-modal');
const registerMarketForm = document.getElementById('register-market-form');

function openMarketRegisterModal() {
  if (marketData) {
    document.getElementById('market-input-name').value = marketData.name || '';
    document.getElementById('market-input-bairro').value = marketData.bairro || '';
    document.getElementById('market-input-maps-link').value = marketData.mapsLink || '';
    document.getElementById('market-input-icon').value = marketData.icon || '🏪';
  } else {
    registerMarketForm?.reset();
  }
  registerMarketModal?.classList.remove('hidden');
}

document.getElementById('edit-market-btn')?.addEventListener('click', openMarketRegisterModal);
document.getElementById('close-register-market-modal-btn')?.addEventListener('click', () => {
  registerMarketModal?.classList.add('hidden');
});

registerMarketForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  marketData = {
    name: document.getElementById('market-input-name').value,
    bairro: document.getElementById('market-input-bairro').value,
    mapsLink: document.getElementById('market-input-maps-link').value,
    icon: document.getElementById('market-input-icon').value
  };

  isSellerMode = true;
  saveState();
  updateProfileStats();
  registerMarketModal?.classList.add('hidden');
  alert('Estabelecimento e localização salvos com sucesso!');
});

// ----------------------------------------------------
// INVENTÁRIO (MEUS ALIMENTOS)
// ----------------------------------------------------
function updateAlertBanner() {
  const alertBanner = document.getElementById('alert-banner');
  const alertText = document.getElementById('alert-text');
  if (!alertBanner || !alertText) return;

  const urgentCount = foodsData.filter(food => {
    const days = calculateDaysToExpiry(food.expiryDate);
    return days >= 0 && days <= 3;
  }).length;

  if (urgentCount > 0) {
    alertText.textContent = `Você tem ${urgentCount} alimento(s) próximo(s) do vencimento`;
    alertBanner.classList.remove('hidden');
  } else {
    alertBanner.classList.add('hidden');
  }
}

function renderInventory() {
  const container = document.getElementById('food-list');
  if (!container) return;
  container.innerHTML = '';

  const filteredFoods = foodsData.filter(food => {
    const matchesFilter = currentFilter === 'Todos' || food.location === currentFilter;
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (filteredFoods.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#888; margin-top:30px; font-size: 13px;">Nenhum alimento encontrado.</p>';
    return;
  }

  filteredFoods.forEach(food => {
    const days = calculateDaysToExpiry(food.expiryDate);
    const status = getExpiryStatus(days);

    const card = document.createElement('div');
    card.className = 'food-card';
    card.innerHTML = `
      <div class="food-icon">${food.icon}</div>
      <div class="food-info">
        <div class="food-title-row">
          <h3>${food.name}</h3>
          <span class="food-qty-badge">${food.quantity} ${food.unit}</span>
        </div>
        <p class="food-expiry ${status.colorClass}">${status.text}</p>
        <span class="location-tag">${food.location}</span>
      </div>
      <div class="card-actions-row">
        <button class="action-btn edit-btn" data-id="${food.id}" title="Editar alimento">✏️</button>
        <button class="action-btn delete-btn" data-id="${food.id}" title="Consumir / Remover item">🗑️</button>
      </div>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      const itemToEdit = foodsData.find(f => f.id === id);
      if (itemToEdit) openFoodModalForEdit(itemToEdit);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      const itemToRemove = foodsData.find(f => f.id === id);

      if (itemToRemove) {
        const days = calculateDaysToExpiry(itemToRemove.expiryDate);
        if (days >= 0) savedItemsCount += 1;
      }

      foodsData = foodsData.filter(f => f.id !== id);
      saveState();
      renderInventory();
      renderRecipes();
      updateProfileStats();
    });
  });

  updateAlertBanner();
}

const foodModal = document.getElementById('add-modal');
const foodForm = document.getElementById('food-form');

function openFoodModalForEdit(item) {
  document.getElementById('food-modal-title').textContent = 'Editar Alimento';
  document.getElementById('edit-food-id').value = item.id;
  document.getElementById('food-name').value = item.name;
  document.getElementById('food-qty').value = item.quantity;
  document.getElementById('food-unit').value = item.unit;
  document.getElementById('food-expiry').value = item.expiryDate;
  document.getElementById('food-location').value = item.location;
  document.getElementById('food-icon').value = item.icon;
  document.getElementById('save-food-btn').textContent = 'Salvar Alterações';

  foodModal?.classList.remove('hidden');
}

document.getElementById('open-modal-btn')?.addEventListener('click', () => {
  foodForm?.reset();
  document.getElementById('food-modal-title').textContent = 'Cadastrar Alimento';
  document.getElementById('edit-food-id').value = '';
  document.getElementById('save-food-btn').textContent = 'Salvar Alimento';
  foodModal?.classList.remove('hidden');
});

document.getElementById('close-modal-btn')?.addEventListener('click', () => {
  foodModal?.classList.add('hidden');
});

foodForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const editId = document.getElementById('edit-food-id').value;

  if (editId) {
    const index = foodsData.findIndex(f => f.id === editId);
    if (index !== -1) {
      foodsData[index] = {
        id: editId,
        name: document.getElementById('food-name').value,
        quantity: document.getElementById('food-qty').value,
        unit: document.getElementById('food-unit').value,
        expiryDate: document.getElementById('food-expiry').value,
        location: document.getElementById('food-location').value,
        icon: document.getElementById('food-icon').value,
      };
    }
  } else {
    const newFood = {
      id: Date.now().toString(),
      name: document.getElementById('food-name').value,
      quantity: document.getElementById('food-qty').value,
      unit: document.getElementById('food-unit').value,
      expiryDate: document.getElementById('food-expiry').value,
      location: document.getElementById('food-location').value,
      icon: document.getElementById('food-icon').value,
    };
    foodsData.push(newFood);
  }

  saveState();
  renderInventory();
  renderRecipes();

  foodForm.reset();
  foodModal?.classList.add('hidden');
});

// ----------------------------------------------------
// OFERTAS & GOOGLE MAPS
// ----------------------------------------------------
function renderOffers() {
  const container = document.getElementById('offer-list');
  if (!container) return;
  container.innerHTML = '';

  const filteredOffers = offersData.filter(offer => {
    if (currentOfferFilter === 'Todos') return true;
    return offer.category === currentOfferFilter;
  });

  if (filteredOffers.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#888; margin-top:30px; font-size: 13px;">Nenhuma oferta nesta categoria.</p>';
    return;
  }

  filteredOffers.forEach(offer => {
    const card = document.createElement('div');
    card.className = 'offer-card';
    card.innerHTML = `
      <div class="offer-icon">${offer.icon}</div>
      <div class="offer-info">
        <div class="offer-title">${offer.title}</div>
        <div class="offer-market">${offer.market} • ${offer.distance}</div>
        <div class="offer-price-row">
          <span class="price-current">R$ ${offer.price.toFixed(2).replace('.', ',')}</span>
          <span class="price-old">R$ ${offer.oldPrice.toFixed(2).replace('.', ',')}</span>
        </div>
      </div>
      <span class="badge-discount">${offer.discount}</span>
    `;

    card.addEventListener('click', () => openOfferModal(offer));
    container.appendChild(card);
  });
}

function openOfferModal(offer) {
  selectedOffer = offer;
  const modal = document.getElementById('offer-modal');

  document.getElementById('offer-modal-icon').textContent = offer.icon;
  document.getElementById('offer-modal-title').textContent = offer.title;
  document.getElementById('offer-modal-market').textContent = `${offer.market} • ${offer.distance}`;
  document.getElementById('offer-modal-price').textContent = `R$ ${offer.price.toFixed(2).replace('.', ',')}`;
  document.getElementById('offer-modal-old-price').textContent = `R$ ${offer.oldPrice.toFixed(2).replace('.', ',')}`;
  document.getElementById('offer-modal-discount').textContent = offer.discount;
  document.getElementById('offer-modal-dist').textContent = offer.distance;
  document.getElementById('offer-modal-validity').textContent = offer.validity;
  document.getElementById('offer-modal-weight').textContent = offer.weight;

  modal?.classList.remove('hidden');
}

function openGoogleMaps(mapsLink, marketName) {
  if (mapsLink && mapsLink.trim().startsWith('http')) {
    window.open(mapsLink, '_blank');
  } else {
    const query = encodeURIComponent(`${marketName} Florianópolis`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  }
}

function renderMarketsListModal() {
  const modal = document.getElementById('map-modal');
  const container = document.getElementById('map-markets-container');
  if (!container) return;
  container.innerHTML = '';

  offersData.forEach(offer => {
    const item = document.createElement('div');
    item.className = 'market-location-card';
    item.innerHTML = `
      <div class="market-card-header">
        <span class="market-icon">${offer.icon}</span>
        <div>
          <strong>${offer.market}</strong>
          <p class="greeting-subtitle">${offer.title} (${offer.discount}) • ${offer.distance}</p>
        </div>
      </div>
      <button class="btn-secondary map-direct-btn">🗺️ Abrir Rota no Google Maps</button>
    `;

    item.querySelector('.map-direct-btn').addEventListener('click', () => {
      openGoogleMaps(offer.mapsLink, offer.market);
    });

    container.appendChild(item);
  });

  modal?.classList.remove('hidden');
}

document.getElementById('open-general-map-btn')?.addEventListener('click', () => renderMarketsListModal());
document.getElementById('open-single-offer-map-btn')?.addEventListener('click', () => {
  if (selectedOffer) openGoogleMaps(selectedOffer.mapsLink, selectedOffer.market);
});
document.getElementById('close-map-modal-btn')?.addEventListener('click', () => {
  document.getElementById('map-modal')?.classList.add('hidden');
});

// Comprar / Garantir Oferta
document.getElementById('buy-offer-btn')?.addEventListener('click', () => {
  if (!selectedOffer) return;

  const savedDifference = selectedOffer.oldPrice - selectedOffer.price;
  totalSavedMoney += savedDifference;

  const newInventoryItem = {
    id: Date.now().toString(),
    name: selectedOffer.title,
    quantity: 1,
    unit: 'un',
    expiryDate: '2026-10-15',
    location: 'Na geladeira',
    icon: selectedOffer.icon
  };

  foodsData.push(newInventoryItem);
  saveState();

  renderInventory();
  renderRecipes();
  updateProfileStats();

  alert(`Sucesso! Você economizou R$ ${savedDifference.toFixed(2).replace('.', ',')} comprando no ${selectedOffer.market}. O produto foi adicionado ao seu inventário.`);
  document.getElementById('offer-modal')?.classList.add('hidden');
});

document.getElementById('close-offer-modal-btn')?.addEventListener('click', () => {
  document.getElementById('offer-modal')?.classList.add('hidden');
});

// Cadastro de Produto pelo Mercado Parceiro
const addOfferModal = document.getElementById('add-offer-modal');
const partnerOfferForm = document.getElementById('partner-offer-form');

function openAddOfferModal() {
  if (!marketData) {
    alert('Você precisa cadastrar seu estabelecimento primeiro!');
    openMarketRegisterModal();
    return;
  }

  partnerOfferForm?.reset();
  const subtitle = document.getElementById('offer-modal-market-subtitle');
  if (subtitle) {
    subtitle.textContent = `Publicando item para: ${marketData.name} (${marketData.bairro})`;
  }
  addOfferModal?.classList.remove('hidden');
}

document.getElementById('open-add-offer-modal-btn')?.addEventListener('click', openAddOfferModal);
document.getElementById('seller-add-offer-btn')?.addEventListener('click', openAddOfferModal);

document.getElementById('close-add-offer-modal-btn')?.addEventListener('click', () => {
  addOfferModal?.classList.add('hidden');
});

partnerOfferForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!marketData) {
    alert('Erro: Cadastre os dados do seu mercado antes de publicar promoções.');
    return;
  }

  const oldPrice = parseFloat(document.getElementById('new-offer-old-price').value);
  const price = parseFloat(document.getElementById('new-offer-price').value);
  const discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);

  const newOffer = {
    id: 'o_' + Date.now(),
    title: document.getElementById('new-offer-title').value,
    market: marketData.name,
    distance: marketData.bairro,
    mapsLink: marketData.mapsLink,
    price: price,
    oldPrice: oldPrice,
    discount: `-${discountPercent}%`,
    validity: document.getElementById('new-offer-validity').value,
    weight: document.getElementById('new-offer-weight').value,
    category: document.getElementById('new-offer-category').value,
    icon: document.getElementById('new-offer-icon').value
  };

  offersData.unshift(newOffer);
  saveState();
  renderOffers();

  partnerOfferForm.reset();
  addOfferModal?.classList.add('hidden');
  alert(`Sua promoção de ${newOffer.title} foi publicada com o link de localização do seu mercado no Google Maps!`);
});

// ----------------------------------------------------
// RECEITAS & FAVORITOS
// ----------------------------------------------------
function userHasIngredient(keyword) {
  if (!keyword) return true;
  return foodsData.some(food => food.name.toLowerCase().includes(keyword.toLowerCase()));
}

function getRecipeMatchInfo(recipe) {
  const matchable = recipe.ingredients.filter(ing => ing.matchKeyword !== null);
  const matched = matchable.filter(ing => userHasIngredient(ing.matchKeyword));
  
  const isExpiringMatch = matchable.some(ing => {
    return foodsData.some(food => {
      const days = calculateDaysToExpiry(food.expiryDate);
      return food.name.toLowerCase().includes((ing.matchKeyword || '').toLowerCase()) && days >= 0 && days <= 3;
    });
  });

  return {
    total: matchable.length,
    count: matched.length,
    isComplete: matched.length === matchable.length,
    usesExpiring: isExpiringMatch
  };
}

function renderRecipes() {
  const container = document.getElementById('recipe-list');
  if (!container) return;
  container.innerHTML = '';

  const filteredRecipes = recipesData.filter(recipe => {
    const match = getRecipeMatchInfo(recipe);
    const isFav = favoriteRecipeIds.includes(recipe.id);

    if (currentRecipeFilter === 'posso-fazer') return match.isComplete;
    if (currentRecipeFilter === 'vencendo') return match.usesExpiring;
    if (currentRecipeFilter === 'favoritas') return isFav;
    return true;
  });

  if (filteredRecipes.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#888; margin-top:30px; font-size: 13px;">Nenhuma receita atende aos filtros atuais.</p>';
    return;
  }

  filteredRecipes.forEach(recipe => {
    const match = getRecipeMatchInfo(recipe);
    const isFav = favoriteRecipeIds.includes(recipe.id);

    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    const tagClass = match.isComplete ? 'avail-full' : 'avail-partial';
    const tagText = match.isComplete ? '✔️ Você tem os ingredientes' : `⚠ Tem ${match.count} de ${match.total} ingredientes`;

    card.innerHTML = `
      <div class="recipe-card-icon">${recipe.icon}</div>
      <div class="recipe-card-info">
        <div class="recipe-card-title">${recipe.title}</div>
        <div class="recipe-card-meta">⏱️ ${recipe.time} • ${recipe.difficulty}</div>
        <span class="recipe-availability ${tagClass}">${tagText}</span>
      </div>
      <button class="fav-btn" data-id="${recipe.id}">${isFav ? '❤️' : '🤍'}</button>
    `;

    card.querySelector('.fav-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavoriteRecipe(recipe.id);
    });

    card.addEventListener('click', () => openRecipeModal(recipe));
    container.appendChild(card);
  });
}

function toggleFavoriteRecipe(id) {
  if (favoriteRecipeIds.includes(id)) {
    favoriteRecipeIds = favoriteRecipeIds.filter(favId => favId !== id);
  } else {
    favoriteRecipeIds.push(id);
  }
  saveState();
  renderRecipes();

  if (currentViewingRecipe && currentViewingRecipe.id === id) {
    const favBtn = document.getElementById('recipe-modal-fav-btn');
    if (favBtn) favBtn.textContent = favoriteRecipeIds.includes(id) ? '❤️' : '🤍';
  }
}

function openRecipeModal(recipe) {
  currentViewingRecipe = recipe;
  const modal = document.getElementById('recipe-modal');
  document.getElementById('recipe-modal-icon').textContent = recipe.icon;
  document.getElementById('recipe-modal-title').textContent = recipe.title;
  document.getElementById('recipe-modal-meta').textContent = `⏱️ ${recipe.time} • Dificuldade: ${recipe.difficulty}`;

  const isFav = favoriteRecipeIds.includes(recipe.id);
  const favBtn = document.getElementById('recipe-modal-fav-btn');
  if (favBtn) favBtn.textContent = isFav ? '❤️' : '🤍';

  const ingredientsList = document.getElementById('recipe-modal-ingredients');
  ingredientsList.innerHTML = '';

  recipe.ingredients.forEach(ing => {
    const hasIt = userHasIngredient(ing.matchKeyword);
    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${ing.name}</strong> (${ing.qty})</span>
      <span class="ing-check ${hasIt ? 'available' : 'missing'}">
        ${hasIt ? '✔️ Você tem' : '❌ Faltando'}
      </span>
    `;
    ingredientsList.appendChild(li);
  });

  const stepsList = document.getElementById('recipe-modal-steps');
  stepsList.innerHTML = '';
  recipe.steps.forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    stepsList.appendChild(li);
  });

  modal?.classList.remove('hidden');
}

document.getElementById('recipe-modal-fav-btn')?.addEventListener('click', () => {
  if (currentViewingRecipe) toggleFavoriteRecipe(currentViewingRecipe.id);
});

document.getElementById('close-recipe-modal-btn')?.addEventListener('click', () => {
  document.getElementById('recipe-modal')?.classList.add('hidden');
});

// ----------------------------------------------------
// PESQUISA, FILTROS & NAVEGAÇÃO SPA
// ----------------------------------------------------
document.getElementById('search-input')?.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderInventory();
});

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.getAttribute('data-filter');
    renderInventory();
  });
});

document.querySelectorAll('.tab-recipe-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.tab-recipe-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentRecipeFilter = e.target.getAttribute('data-recipe-filter');
    renderRecipes();
  });
});

document.querySelectorAll('.tab-offer-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.tab-offer-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentOfferFilter = e.target.getAttribute('data-offer-filter');
    renderOffers();
  });
});

function switchTab(targetViewId) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

  const navButton = document.querySelector(`.nav-item[data-target="${targetViewId}"]`);
  if (navButton) navButton.classList.add('active');

  const targetView = document.getElementById(targetViewId);
  if (targetView) targetView.classList.add('active');

  if (targetViewId === 'view-recipes') renderRecipes();
  if (targetViewId === 'view-offers') renderOffers();
  if (targetViewId === 'view-profile') updateProfileStats();
}

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => switchTab(item.getAttribute('data-target')));
});

document.querySelectorAll('.nav-trigger').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.getAttribute('data-target')));
});

// ----------------------------------------------------
// CONFIGURAÇÕES, PERFIL E AJUDA
// ----------------------------------------------------
document.getElementById('open-settings-btn')?.addEventListener('click', () => {
  document.getElementById('settings-modal')?.classList.remove('hidden');
});
document.getElementById('close-settings-modal-btn')?.addEventListener('click', () => {
  document.getElementById('settings-modal')?.classList.add('hidden');
});

document.getElementById('open-help-btn')?.addEventListener('click', () => {
  document.getElementById('help-modal')?.classList.remove('hidden');
});
document.getElementById('close-help-modal-btn')?.addEventListener('click', () => {
  document.getElementById('help-modal')?.classList.add('hidden');
});

document.getElementById('toggle-dark-mode')?.addEventListener('change', (e) => {
  if (e.target.checked) document.body.classList.add('dark-theme');
  else document.body.classList.remove('dark-theme');
});

document.getElementById('reset-app-btn')?.addEventListener('click', () => {
  if (confirm('Tem certeza que deseja resetar os dados do aplicativo para o padrão inicial?')) {
    localStorage.clear();
    location.reload();
  }
});

const profileModal = document.getElementById('profile-modal');
document.getElementById('open-edit-profile-btn')?.addEventListener('click', () => {
  document.getElementById('edit-profile-name').value = profileData.name;
  document.getElementById('edit-profile-tag').value = profileData.tag;
  profileModal?.classList.remove('hidden');
});

document.getElementById('close-profile-modal-btn')?.addEventListener('click', () => {
  profileModal?.classList.add('hidden');
});

document.getElementById('profile-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  profileData.name = document.getElementById('edit-profile-name').value;
  profileData.tag = document.getElementById('edit-profile-tag').value;
  saveState();
  updateProfileStats();
  profileModal?.classList.add('hidden');
});

// ----------------------------------------------------
// INICIALIZAÇÃO
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderInventory();
  renderRecipes();
  renderOffers();
  updateProfileStats();
});