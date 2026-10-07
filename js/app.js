// js/app.js
import { calculateDaysToExpiry, getExpiryStatus } from './dateManager.js';
import { defaultFoods, offersData as initialOffers, recipesData } from './data.js';

// ----------------------------------------------------
// BANCO DE DADOS DE ALIMENTOS (AUTOCOMPLETE & PADRONIZAÇÃO)
// ----------------------------------------------------
const foodDictionary = [
  { name: 'Arroz Branco', icon: '🍚', category: 'Grãos' },
  { name: 'Arroz Integral', icon: '🍚', category: 'Grãos' },
  { name: 'Feijão Carioca', icon: '🫘', category: 'Grãos' },
  { name: 'Feijão Preto', icon: '🫘', category: 'Grãos' },
  { name: 'Tomate Italiano', icon: '🍅', category: 'Hortifruti' },
  { name: 'Tomate Cereja', icon: '🍅', category: 'Hortifruti' },
  { name: 'Cebola Branca', icon: '🧅', category: 'Hortifruti' },
  { name: 'Cebola Roxa', icon: '🧅', category: 'Hortifruti' },
  { name: 'Alho', icon: '🧄', category: 'Hortifruti' },
  { name: 'Batata Inglesa', icon: '🥔', category: 'Hortifruti' },
  { name: 'Batata Doce', icon: '🍠', category: 'Hortifruti' },
  { name: 'Cenoura', icon: '🥕', category: 'Hortifruti' },
  { name: 'Brócolis', icon: '🥦', category: 'Hortifruti' },
  { name: 'Couve-manteiga', icon: '🥬', category: 'Hortifruti' },
  { name: 'Alface', icon: '🥬', category: 'Hortifruti' },
  { name: 'Banana Prata', icon: '🍌', category: 'Frutas' },
  { name: 'Banana Nanica', icon: '🍌', category: 'Frutas' },
  { name: 'Maçã Fuji', icon: '🍎', category: 'Frutas' },
  { name: 'Laranja', icon: '🍊', category: 'Frutas' },
  { name: 'Limão Tahiti', icon: '🍋', category: 'Frutas' },
  { name: 'Leite Integral', icon: '🥛', category: 'Laticínios' },
  { name: 'Leite Desnatado', icon: '🥛', category: 'Laticínios' },
  { name: 'Queijo Muçarela', icon: '🧀', category: 'Laticínios' },
  { name: 'Queijo Prato', icon: '🧀', category: 'Laticínios' },
  { name: 'Iogurte Natural', icon: '🥛', category: 'Laticínios' },
  { name: 'Pão de Forma', icon: '🍞', category: 'Padaria' },
  { name: 'Pão Francês', icon: '🥖', category: 'Padaria' },
  { name: 'Pão Integral', icon: '🍞', category: 'Padaria' },
  { name: 'Ovos Brancos', icon: '🥚', category: 'Proteínas' },
  { name: 'Ovos Caipiras', icon: '🥚', category: 'Proteínas' },
  { name: 'Carne Moída (Patinho)', icon: '🥩', category: 'Proteínas' },
  { name: 'Peito de Frango', icon: '🍗', category: 'Proteínas' },
  { name: 'Linguiça Calabresa', icon: '🥓', category: 'Proteínas' },
  { name: 'Aveia em Flocos', icon: '🌾', category: 'Despensa' },
  { name: 'Farinha de Trigo', icon: '🌾', category: 'Despensa' },
  { name: 'Açúcar Cristal', icon: '🧂', category: 'Despensa' },
  { name: 'Óleo de Soja', icon: '🛢️', category: 'Despensa' },
  { name: 'Azeite de Oliva', icon: '🫒', category: 'Despensa' }
];

// Inicializando o Estoque Real para as ofertas (se não existir)
initialOffers.forEach(o => {
  if (o.stock === undefined) o.stock = 15; // Estoque padrão de 15 unidades
});

// ----------------------------------------------------
// ESTADO GLOBAL DA APLICAÇÃO
// ----------------------------------------------------
let foodsData = JSON.parse(localStorage.getItem('my_foods')) || defaultFoods;
let offersData = JSON.parse(localStorage.getItem('my_offers')) || initialOffers;
let profileData = JSON.parse(localStorage.getItem('my_profile')) || null;
let favoriteRecipeIds = JSON.parse(localStorage.getItem('my_favorite_recipes')) || [];
let totalSavedMoney = parseFloat(localStorage.getItem('my_saved_money')) || 0.00;
let savedItemsCount = parseInt(localStorage.getItem('my_saved_items_count')) || 0;

let isSellerMode = JSON.parse(localStorage.getItem('my_seller_mode')) || false;
let marketData = JSON.parse(localStorage.getItem('my_market_data')) || null;

// Filtros de Inventário
let currentFilter = 'Todos';
let searchQuery = '';

// Filtros de Ofertas
let currentOfferFilter = 'Todos';
let offerSearchQuery = '';

// Filtros de Receitas
let currentRecipeFilter = 'todas';
let recipeTypeFilter = 'todos';
let recipeSearchQuery = '';

let selectedOffer = null;
let currentViewingRecipe = null;

// ----------------------------------------------------
// PERSISTÊNCIA DE DADOS (LOCALSTORAGE)
// ----------------------------------------------------
function saveState() {
  localStorage.setItem('my_foods', JSON.stringify(foodsData));
  localStorage.setItem('my_offers', JSON.stringify(offersData));
  if (profileData) {
    localStorage.setItem('my_profile', JSON.stringify(profileData));
  } else {
    localStorage.removeItem('my_profile');
  }
  localStorage.setItem('my_favorite_recipes', JSON.stringify(favoriteRecipeIds));
  localStorage.setItem('my_saved_money', totalSavedMoney.toFixed(2));
  localStorage.setItem('my_saved_items_count', savedItemsCount.toString());
  
  localStorage.setItem('my_seller_mode', JSON.stringify(isSellerMode));
  localStorage.setItem('my_market_data', JSON.stringify(marketData));
}

// ----------------------------------------------------
// NOTIFICAÇÕES NATIVAS DO NAVEGADOR
// ----------------------------------------------------
function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        alert('Notificações ativadas com sucesso!');
        triggerExpiryNotifications();
      } else {
        alert('Permissão de notificação negada.');
      }
    });
  }
}

function triggerExpiryNotifications() {
  if ('Notification' in window && Notification.permission === 'granted') {
    const expiringFoods = foodsData.filter(food => {
      const days = calculateDaysToExpiry(food.expiryDate);
      return days >= 0 && days <= 2;
    });

    if (expiringFoods.length > 0) {
      const foodNames = expiringFoods.map(f => f.name).join(', ');
      new Notification('⚠️ Alerta de Validade', {
        body: `Você tem ${expiringFoods.length} alimento(s) a vencer: ${foodNames}.`,
        icon: '🥬'
      });
    }
  }
}

document.getElementById('enable-notifications-btn')?.addEventListener('click', requestNotificationPermission);

// ----------------------------------------------------
// TRANSIÇÃO DE CONTAS E ISOLAMENTO (CONSUMIDOR <-> LOJISTA)
// ----------------------------------------------------
function applyCurrentMode(withAnimation = false) {
  const consumerNav = document.getElementById('consumer-nav');
  const sellerNav = document.getElementById('seller-nav');
  const overlay = document.getElementById('switch-account-overlay');

  const executeSwitch = () => {
    if (isSellerMode) {
      document.body.classList.add('seller-theme');
      if (consumerNav) consumerNav.classList.add('hidden');
      if (sellerNav) sellerNav.classList.remove('hidden');
      switchTab('view-seller-dashboard');
      renderSellerDashboard();
      renderSellerProducts();
    } else {
      document.body.classList.remove('seller-theme');
      if (sellerNav) sellerNav.classList.add('hidden');
      if (consumerNav) consumerNav.classList.remove('hidden');
      switchTab('view-inventory');
    }
  };

  if (withAnimation && overlay) {
    overlay.classList.remove('hidden');
    setTimeout(() => {
      executeSwitch();
      setTimeout(() => overlay.classList.add('hidden'), 150);
    }, 800);
  } else {
    executeSwitch();
  }
}

document.getElementById('enter-seller-mode-btn')?.addEventListener('click', () => {
  if (!marketData) {
    openMarketRegisterModal();
  } else {
    isSellerMode = true;
    saveState();
    applyCurrentMode(true);
  }
});

document.getElementById('exit-seller-mode-btn')?.addEventListener('click', () => {
  isSellerMode = false;
  saveState();
  updateProfileStats();
  applyCurrentMode(true);
});

// ----------------------------------------------------
// NAVEGAÇÃO SPA
// ----------------------------------------------------
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
  if (targetViewId === 'view-seller-dashboard') renderSellerDashboard();
  if (targetViewId === 'view-seller-products') renderSellerProducts();
}

document.querySelectorAll('.nav-item, .nav-trigger').forEach(item => {
  item.addEventListener('click', () => switchTab(item.getAttribute('data-target')));
});

// ----------------------------------------------------
// PRIMEIRO ACESSO E PERFIL
// ----------------------------------------------------
function checkFirstAccess() {
  const onboardingModal = document.getElementById('onboarding-modal');
  if (!profileData) {
    onboardingModal?.classList.remove('hidden');
  } else {
    onboardingModal?.classList.add('hidden');
    applyCurrentMode();
  }
}

document.getElementById('onboarding-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  profileData = {
    name: document.getElementById('onboarding-name').value,
    tag: document.getElementById('onboarding-tag').value
  };
  saveState();
  updateProfileStats();
  document.getElementById('onboarding-modal')?.classList.add('hidden');
  applyCurrentMode();
});

function updateProfileStats() {
  if (!profileData) return;

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

  if (marketData) {
    const marketNameEl = document.getElementById('seller-market-name');
    const marketLocEl = document.getElementById('seller-market-loc');
    if (marketNameEl) marketNameEl.textContent = `${marketData.icon} ${marketData.name}`;
    if (marketLocEl) marketLocEl.textContent = marketData.bairro;
  }
}

// ----------------------------------------------------
// CADASTRO DE MERCADO
// ----------------------------------------------------
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
  applyCurrentMode(true);
});

// ----------------------------------------------------
// SISTEMA DE AUTOCOMPLETE NO CADASTRO DE ALIMENTOS
// ----------------------------------------------------
const foodNameInput = document.getElementById('food-name');
const foodIconSelect = document.getElementById('food-icon');
let autocompleteList = null;

function setupAutocomplete() {
  if (!foodNameInput) return;

  // Cria a div da lista de autocomplete
  const wrapper = document.createElement('div');
  wrapper.className = 'autocomplete-wrapper';
  foodNameInput.parentNode.insertBefore(wrapper, foodNameInput);
  wrapper.appendChild(foodNameInput);

  autocompleteList = document.createElement('div');
  autocompleteList.className = 'autocomplete-list';
  wrapper.appendChild(autocompleteList);

  foodNameInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    autocompleteList.innerHTML = '';

    if (query.length < 1) {
      autocompleteList.classList.remove('visible');
      return;
    }

    const matches = foodDictionary.filter(food => food.name.toLowerCase().includes(query));
    
    if (matches.length > 0) {
      // Agrupa por categoria
      const byCategory = {};
      matches.forEach(m => {
        if (!byCategory[m.category]) byCategory[m.category] = [];
        byCategory[m.category].push(m);
      });

      Object.keys(byCategory).forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = 'autocomplete-category';
        catDiv.textContent = cat;
        autocompleteList.appendChild(catDiv);

        byCategory[cat].forEach(item => {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'autocomplete-item';
          itemDiv.innerHTML = `<strong>${item.icon}</strong> ${item.name}`;
          
          itemDiv.addEventListener('click', () => {
            foodNameInput.value = item.name;
            
            // Tenta selecionar o ícone correspondente no select
            Array.from(foodIconSelect.options).forEach(opt => {
              if (opt.value === item.icon) foodIconSelect.value = item.icon;
            });

            autocompleteList.classList.remove('visible');
          });

          autocompleteList.appendChild(itemDiv);
        });
      });

      autocompleteList.classList.add('visible');
    } else {
      autocompleteList.classList.remove('visible');
    }
  });

  // Fecha o autocomplete ao clicar fora
  document.addEventListener('click', (e) => {
    if (e.target !== foodNameInput && e.target !== autocompleteList) {
      autocompleteList.classList.remove('visible');
    }
  });
}

setupAutocomplete();

// ----------------------------------------------------
// INVENTÁRIO COM AGRUPAMENTO (SANFONA/ACCORDION)
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

  // Filtra
  const filteredFoods = foodsData.filter(food => {
    const matchesFilter = currentFilter === 'Todos' || food.location === currentFilter;
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (filteredFoods.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#888; margin-top:30px; font-size: 13px;">Nenhum alimento encontrado no estoque.</p>';
    return;
  }

  // Agrupa os alimentos pelo nome ignorando maiúsculas
  const groupedFoods = {};
  filteredFoods.forEach(food => {
    const key = food.name.toLowerCase().trim();
    if (!groupedFoods[key]) {
      groupedFoods[key] = {
        name: food.name, // Nome original do primeiro encontrado
        icon: food.icon,
        items: [],
        totalQty: 0,
        unit: food.unit // Assume a unidade do primeiro
      };
    }
    groupedFoods[key].items.push(food);
    groupedFoods[key].totalQty += parseFloat(food.quantity);
  });

  // Renderiza a Sanfona (Accordion)
  Object.values(groupedFoods).forEach(group => {
    // Verifica a validade mais crítica do grupo para a cor do cartão principal
    let minDays = Infinity;
    group.items.forEach(item => {
      const days = calculateDaysToExpiry(item.expiryDate);
      if (days < minDays) minDays = days;
    });
    const mainStatus = getExpiryStatus(minDays);

    const wrapper = document.createElement('div');
    wrapper.className = 'food-group-wrapper';

    // Cabeçalho da Sanfona
    const header = document.createElement('div');
    header.className = 'food-group-header';
    header.innerHTML = `
      <div class="food-icon">${group.icon}</div>
      <div class="food-info">
        <div class="food-title-row">
          <h3>${group.name}</h3>
          <span class="food-qty-badge">${group.totalQty} ${group.unit}</span>
        </div>
        <p class="food-expiry ${mainStatus.colorClass}">${group.items.length > 1 ? group.items.length + ' lotes | Mais crítico: ' + mainStatus.text : mainStatus.text}</p>
      </div>
      <span class="expand-icon">▼</span>
    `;

    // Corpo da Sanfona (Os itens individuais)
    const content = document.createElement('div');
    content.className = 'food-group-content';
    
    // Se só tiver um item, já abre expandido e esconde a seta
    if (group.items.length === 1) {
      content.classList.add('expanded');
      header.querySelector('.expand-icon').style.display = 'none';
      header.style.cursor = 'default';
      header.style.paddingBottom = '4px';
    } else {
      // Toggle de expandir
      header.addEventListener('click', () => {
        content.classList.toggle('expanded');
        header.querySelector('.expand-icon').classList.toggle('rotated');
      });
    }

    // Renderiza cada lote
    group.items.sort((a,b) => calculateDaysToExpiry(a.expiryDate) - calculateDaysToExpiry(b.expiryDate)).forEach(item => {
      const days = calculateDaysToExpiry(item.expiryDate);
      const status = getExpiryStatus(days);

      const row = document.createElement('div');
      row.className = 'sub-item-row';
      row.innerHTML = `
        <div class="sub-item-info">
          <strong>${item.quantity} ${item.unit}</strong>
          <span class="${status.colorClass}" style="font-weight:600;">${status.text}</span>
          <span style="color:var(--text-muted); font-size:10px;">${item.location}</span>
        </div>
        <div class="sub-item-actions">
          <button class="action-btn edit-btn" data-id="${item.id}">✏️</button>
          <button class="action-btn delete-btn" data-id="${item.id}">🗑️</button>
        </div>
      `;
      content.appendChild(row);
    });

    wrapper.appendChild(header);
    wrapper.appendChild(content);
    container.appendChild(wrapper);
  });

  // Listeners de Editar/Apagar nos sub-itens
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = e.target.closest('.action-btn').getAttribute('data-id');
      const itemToEdit = foodsData.find(f => f.id === id);
      if (itemToEdit) openFoodModalForEdit(itemToEdit);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = e.target.closest('.action-btn').getAttribute('data-id');
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

  const newData = {
    name: document.getElementById('food-name').value,
    quantity: document.getElementById('food-qty').value,
    unit: document.getElementById('food-unit').value,
    expiryDate: document.getElementById('food-expiry').value,
    location: document.getElementById('food-location').value,
    icon: document.getElementById('food-icon').value,
  };

  if (editId) {
    const index = foodsData.findIndex(f => f.id === editId);
    if (index !== -1) {
      foodsData[index] = { id: editId, ...newData };
    }
  } else {
    foodsData.push({ id: Date.now().toString(), ...newData });
  }

  saveState();
  renderInventory();
  renderRecipes();
  triggerExpiryNotifications();

  foodForm.reset();
  foodModal?.classList.add('hidden');
});

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

// ----------------------------------------------------
// OFERTAS & COMPRA REAL COM ESTOQUE (CONSUMIDOR)
// ----------------------------------------------------
function renderOffers() {
  const container = document.getElementById('offer-list');
  if (!container) return;
  container.innerHTML = '';

  const filteredOffers = offersData.filter(offer => {
    // Filtro de ofertas: Apenas mostra as que têm estoque
    const hasStock = offer.stock > 0;
    const matchesCategory = currentOfferFilter === 'Todos' || offer.category === currentOfferFilter;
    const query = offerSearchQuery.toLowerCase();
    const matchesSearch = offer.title.toLowerCase().includes(query) || offer.market.toLowerCase().includes(query);
    return hasStock && matchesCategory && matchesSearch;
  });

  if (filteredOffers.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#888; margin-top:30px; font-size: 13px;">Nenhuma oferta com estoque disponível para esta busca.</p>';
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

document.getElementById('offer-search-input')?.addEventListener('input', (e) => {
  offerSearchQuery = e.target.value;
  renderOffers();
});

document.querySelectorAll('.tab-offer-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.tab-offer-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentOfferFilter = e.target.getAttribute('data-offer-filter');
    renderOffers();
  });
});

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

  // Botão de comprar
  const buyBtn = document.getElementById('buy-offer-btn');
  if (offer.stock <= 0) {
    buyBtn.textContent = 'Produto Esgotado';
    buyBtn.disabled = true;
    buyBtn.style.background = 'var(--text-muted)';
  } else {
    buyBtn.textContent = `Comprar (Restam ${offer.stock} un)`;
    buyBtn.disabled = false;
    buyBtn.style.background = 'var(--primary)';
  }

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

document.getElementById('open-general-map-btn')?.addEventListener('click', renderMarketsListModal);
document.getElementById('open-single-offer-map-btn')?.addEventListener('click', () => {
  if (selectedOffer) openGoogleMaps(selectedOffer.mapsLink, selectedOffer.market);
});
document.getElementById('close-map-modal-btn')?.addEventListener('click', () => {
  document.getElementById('map-modal')?.classList.add('hidden');
});

// A LÓGICA DE COMPRA (RETIRA ESTOQUE, DÁ RECEITA AO VENDEDOR, E VAI PRA GELADEIRA)
document.getElementById('buy-offer-btn')?.addEventListener('click', () => {
  if (!selectedOffer) return;
  if (selectedOffer.stock <= 0) return;

  // 1. Desconta 1 do estoque da oferta global
  selectedOffer.stock -= 1;

  // 2. Adiciona o valor à Receita Real do Mercado
  let sellerRevenue = parseFloat(localStorage.getItem('my_market_revenue_' + selectedOffer.market)) || 0;
  sellerRevenue += selectedOffer.price;
  localStorage.setItem('my_market_revenue_' + selectedOffer.market, sellerRevenue);

  let sellerSoldItems = parseInt(localStorage.getItem('my_market_sold_' + selectedOffer.market)) || 0;
  sellerSoldItems += 1;
  localStorage.setItem('my_market_sold_' + selectedOffer.market, sellerSoldItems);

  // 3. Adiciona Economia do Cliente
  const savedDifference = selectedOffer.oldPrice - selectedOffer.price;
  totalSavedMoney += savedDifference;

  // 4. Salva no inventário do Cliente com nome limpo
  const cleanName = selectedOffer.baseName || selectedOffer.title;
  const newInventoryItem = {
    id: Date.now().toString(),
    name: cleanName,
    quantity: 1,
    unit: 'un',
    expiryDate: selectedOffer.validity,
    location: 'Na geladeira',
    icon: selectedOffer.icon
  };

  foodsData.push(newInventoryItem);
  saveState();

  renderInventory();
  renderRecipes();
  renderOffers();
  updateProfileStats();

  alert(`Sucesso! Você economizou R$ ${savedDifference.toFixed(2).replace('.', ',')} comprando no ${selectedOffer.market}.\nO item "${cleanName}" foi adicionado à sua Geladeira.\n\nRestam ${selectedOffer.stock} unidades desta oferta no aplicativo.`);
  document.getElementById('offer-modal')?.classList.add('hidden');
});

document.getElementById('close-offer-modal-btn')?.addEventListener('click', () => {
  document.getElementById('offer-modal')?.classList.add('hidden');
});

// ----------------------------------------------------
// LOJISTA (PAINEL COM VALORES REAIS DE VENDAS) E PRODUTOS
// ----------------------------------------------------
function renderSellerDashboard() {
  if (!marketData) return;
  
  // Lê os dados reais gerados pelos botões de compra
  const currentRev = parseFloat(localStorage.getItem('my_market_revenue_' + marketData.name)) || 0;
  const totalSold = parseInt(localStorage.getItem('my_market_sold_' + marketData.name)) || 0;

  const statSold = document.getElementById('seller-stat-sold');
  const statRev = document.getElementById('seller-stat-revenue');
  
  if (statSold) statSold.textContent = totalSold;
  if (statRev) statRev.textContent = `R$ ${currentRev.toFixed(2).replace('.',',')}`;
}

function renderSellerProducts() {
  const container = document.getElementById('seller-products-list');
  if (!container) return;
  container.innerHTML = '';

  if (!marketData) {
    container.innerHTML = '<p style="text-align:center; padding:20px;">Cadastre seu mercado na aba "Mercado" para visualizar seus produtos.</p>';
    return;
  }

  const myOffers = offersData.filter(o => o.market === marketData.name);

  if (myOffers.length === 0) {
    container.innerHTML = '<p style="text-align:center; padding:20px;">Você ainda não publicou ofertas.</p>';
    return;
  }

  myOffers.forEach(offer => {
    const card = document.createElement('div');
    card.className = 'offer-card';
    
    let stockStatus = `<span class="stock-badge">Em Estoque: ${offer.stock} un</span>`;
    if (offer.stock <= 0) {
      stockStatus = `<span class="stock-badge" style="background:var(--danger-color);">ESGOTADO</span>`;
    }

    card.innerHTML = `
      <div class="offer-icon">${offer.icon}</div>
      <div class="offer-info">
        <div class="offer-title">${offer.title}</div>
        <div class="offer-market">Validade Lote: ${offer.validity}</div>
        ${stockStatus}
      </div>
      <div class="offer-price-row" style="position:absolute; bottom:14px; right:16px;">
        <span class="price-current">R$ ${offer.price.toFixed(2).replace('.', ',')}</span>
      </div>
      <span class="badge-discount">${offer.discount}</span>
    `;
    container.appendChild(card);
  });
}

const addOfferModal = document.getElementById('add-offer-modal');
const partnerOfferForm = document.getElementById('partner-offer-form');

document.getElementById('seller-add-offer-btn')?.addEventListener('click', () => {
  if (!marketData) {
    alert('Você precisa cadastrar seu estabelecimento na aba "Mercado" primeiro!');
    return;
  }
  partnerOfferForm?.reset();
  addOfferModal?.classList.remove('hidden');
});

document.getElementById('close-add-offer-modal-btn')?.addEventListener('click', () => {
  addOfferModal?.classList.add('hidden');
});

partnerOfferForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!marketData) return;

  const oldPrice = parseFloat(document.getElementById('new-offer-old-price').value);
  const price = parseFloat(document.getElementById('new-offer-price').value);
  const discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);
  const titleInput = document.getElementById('new-offer-title').value;

  const newOffer = {
    id: 'o_' + Date.now(),
    title: titleInput,
    baseName: titleInput.split(' Lote')[0],
    market: marketData.name,
    distance: marketData.bairro,
    mapsLink: marketData.mapsLink,
    price: price,
    oldPrice: oldPrice,
    discount: `-${discountPercent}%`,
    validity: document.getElementById('new-offer-validity').value,
    weight: document.getElementById('new-offer-weight').value,
    category: document.getElementById('new-offer-category').value,
    icon: document.getElementById('new-offer-icon').value,
    stock: 15 // Estoque padrão ao criar
  };

  offersData.unshift(newOffer);
  saveState();
  renderSellerProducts();
  renderOffers();
  renderSellerDashboard();

  partnerOfferForm.reset();
  addOfferModal?.classList.add('hidden');
  alert('Produto publicado! Inicializado com 15 unidades de estoque.');
});

// ----------------------------------------------------
// RECEITAS COM LÓGICA DE INGREDIENTES CORRIGIDA
// ----------------------------------------------------
function userHasIngredient(keyword) {
  if (!keyword) return false; 
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
    isComplete: matchable.length > 0 && matched.length === matchable.length,
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

    const query = recipeSearchQuery.toLowerCase();
    const matchesSearch = recipe.title.toLowerCase().includes(query) ||
      recipe.ingredients.some(ing => ing.name.toLowerCase().includes(query));

    const matchesType = recipeTypeFilter === 'todos' || recipe.type === recipeTypeFilter;

    let matchesTab = true;
    if (currentRecipeFilter === 'posso-fazer') matchesTab = match.isComplete;
    if (currentRecipeFilter === 'vencendo') matchesTab = match.usesExpiring;
    if (currentRecipeFilter === 'favoritas') matchesTab = isFav;

    return matchesSearch && matchesType && matchesTab;
  });

  if (filteredRecipes.length === 0) {
    container.innerHTML = '<p style="text-align:center; color:#888; margin-top:30px; font-size: 13px;">Nenhuma receita encontrada.</p>';
    return;
  }

  filteredRecipes.forEach(recipe => {
    const match = getRecipeMatchInfo(recipe);
    const isFav = favoriteRecipeIds.includes(recipe.id);

    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    const tagClass = match.isComplete ? 'avail-full' : 'avail-partial';
    const tagText = match.isComplete ? '✔️ Você tem os ingredientes principais' : `⚠ Tem ${match.count} de ${match.total} itens`;

    card.innerHTML = `
      <div class="recipe-card-icon">${recipe.icon}</div>
      <div class="recipe-card-info">
        <div class="recipe-card-title">${recipe.title}</div>
        <div class="recipe-card-meta">⏱️ ${recipe.time} • ${recipe.difficulty} • ${recipe.type === 'doce' ? '🍰 Doce' : '🍕 Salgado'}</div>
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

document.getElementById('recipe-search-input')?.addEventListener('input', (e) => {
  recipeSearchQuery = e.target.value;
  renderRecipes();
});

document.querySelectorAll('.tab-recipe-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.tab-recipe-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentRecipeFilter = e.target.getAttribute('data-recipe-filter');
    renderRecipes();
  });
});

document.querySelectorAll('.type-pill-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.type-pill-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    recipeTypeFilter = e.target.getAttribute('data-type-filter');
    renderRecipes();
  });
});

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

  const linksContainer = document.getElementById('recipe-links-container');
  if (linksContainer) {
    linksContainer.innerHTML = '';
    if (recipe.websiteLink) {
      linksContainer.innerHTML += `<a href="${recipe.websiteLink}" target="_blank" class="btn-website">🌐 Ver Resultados no TudoGostoso</a>`;
    }
    if (recipe.youtubeLink) {
      linksContainer.innerHTML += `<a href="${recipe.youtubeLink}" target="_blank" class="btn-youtube">▶️ Buscar Vídeo no YouTube</a>`;
    }
  }

  const ingredientsList = document.getElementById('recipe-modal-ingredients');
  ingredientsList.innerHTML = '';

  recipe.ingredients.forEach(ing => {
    let statusHtml = '';
    
    if (ing.matchKeyword === null) {
      statusHtml = `<span class="ing-check" style="color: #718096; font-weight: 600;">🧂 Básico</span>`;
    } else {
      const hasIt = userHasIngredient(ing.matchKeyword);
      statusHtml = `<span class="ing-check ${hasIt ? 'available' : 'missing'}">
        ${hasIt ? '✔️ No estoque' : '❌ Faltando'}
      </span>`;
    }

    const li = document.createElement('li');
    li.innerHTML = `<span><strong>${ing.name}</strong> (${ing.qty})</span> ${statusHtml}`;
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
// CONFIGURAÇÕES E MODAIS DIVERSOS
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
  if (confirm('Tem certeza que deseja resetar todos os dados e começar do zero?')) {
    localStorage.clear();
    location.reload();
  }
});

const profileModal = document.getElementById('profile-modal');
document.getElementById('open-edit-profile-btn')?.addEventListener('click', () => {
  if (profileData) {
    document.getElementById('edit-profile-name').value = profileData.name;
    document.getElementById('edit-profile-tag').value = profileData.tag;
  }
  profileModal?.classList.remove('hidden');
});
document.getElementById('close-profile-modal-btn')?.addEventListener('click', () => {
  profileModal?.classList.add('hidden');
});

document.getElementById('profile-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  profileData = {
    name: document.getElementById('edit-profile-name').value,
    tag: document.getElementById('edit-profile-tag').value
  };
  saveState();
  updateProfileStats();
  profileModal?.classList.add('hidden');
});

// ----------------------------------------------------
// INICIALIZAÇÃO DA APLICAÇÃO
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  checkFirstAccess();
  renderInventory();
  renderRecipes();
  renderOffers();
  updateProfileStats();
  triggerExpiryNotifications();
});