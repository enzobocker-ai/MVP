// js/data.js

export const defaultFoods = [
  { id: '1', name: 'Alface crespa', quantity: 1, unit: 'maço', expiryDate: '2026-10-05', location: 'Na geladeira', icon: '🥬' },
  { id: '2', name: 'Tomate italiano', quantity: 500, unit: 'g', expiryDate: '2026-10-08', location: 'Na geladeira', icon: '🍅' },
  { id: '3', name: 'Banana prata', quantity: 6, unit: 'un', expiryDate: '2026-10-06', location: 'Na fruteira', icon: '🍌' },
  { id: '4', name: 'Iogurte natural', quantity: 2, unit: 'un', expiryDate: '2026-10-07', location: 'Na geladeira', icon: '🥛' },
  { id: '5', name: 'Pão de forma tradicional', quantity: 1, unit: 'un', expiryDate: '2026-10-10', location: 'Na despensa', icon: '🍞' },
  { id: '6', name: 'Queijo muçarela fatiado', quantity: 200, unit: 'g', expiryDate: '2026-10-13', location: 'Na geladeira', icon: '🧀' },
  { id: '7', name: 'Ovos caipiras', quantity: 12, unit: 'un', expiryDate: '2026-10-20', location: 'Na geladeira', icon: '🥚' },
  { id: '8', name: 'Peito de frango', quantity: 1, unit: 'kg', expiryDate: '2026-10-07', location: 'Na geladeira', icon: '🥩' }
];

export const offersData = [
  {
    id: 'o1',
    title: 'Tomate Italiano',
    market: 'Mercado Boa Compra',
    distance: '1,2 km',
    price: 2.99,
    oldPrice: 4.99,
    discount: '-40%',
    validity: '08/10/2026',
    weight: '500g',
    category: 'Frutas e verduras',
    icon: '🍅',
    lat: -27.5954,
    lng: -48.5480
  },
  {
    id: 'o2',
    title: 'Iogurte Natural 170g',
    market: 'Supermercado Mais',
    distance: '2,5 km',
    price: 3.49,
    oldPrice: 4.99,
    discount: '-30%',
    validity: '07/10/2026',
    weight: '170g',
    category: 'Laticínios',
    icon: '🥛',
    lat: -27.5862,
    lng: -48.5225
  },
  {
    id: 'o3',
    title: 'Pão de Forma Integral',
    market: 'Mercado Bom Vizinho',
    distance: '3,1 km',
    price: 4.99,
    oldPrice: 9.99,
    discount: '-50%',
    validity: '10/10/2026',
    weight: '400g',
    category: 'Padaria',
    icon: '🍞',
    lat: -27.5910,
    lng: -48.5710
  },
  {
    id: 'o4',
    title: 'Queijo Muçarela Peça',
    market: 'Supermercado Mais',
    distance: '2,5 km',
    price: 4.54,
    oldPrice: 6.99,
    discount: '-35%',
    validity: '13/10/2026',
    weight: '200g',
    category: 'Laticínios',
    icon: '🧀',
    lat: -27.5862,
    lng: -48.5225
  },
  {
    id: 'o5',
    title: 'Bife de Peito de Frango',
    market: 'Açougue & Mercado Lagoa',
    distance: '4,8 km',
    price: 12.90,
    oldPrice: 18.90,
    discount: '-31%',
    validity: '07/10/2026',
    weight: '1kg',
    category: 'Carnes e Frios',
    icon: '🥩',
    lat: -27.6080,
    lng: -48.4670
  }
];

export const recipesData = [
  {
    id: 'r1',
    title: 'Salada de folhas com tomate e queijo',
    time: '15 min',
    difficulty: 'Fácil',
    icon: '🥗',
    ingredients: [
      { name: 'Alface', qty: '1 maço', matchKeyword: 'alface' },
      { name: 'Tomate', qty: '2 unidades', matchKeyword: 'tomate' },
      { name: 'Queijo muçarela', qty: '100 g', matchKeyword: 'queijo' },
      { name: 'Azeite e sal', qty: 'a gosto', matchKeyword: null }
    ],
    steps: [
      'Lave bem as folhas de alface e corte em pedaços médios.',
      'Corte os tomates e o queijo em cubos.',
      'Junte tudo em uma tigela e tempere com azeite e sal a gosto.'
    ]
  },
  {
    id: 'r2',
    title: 'Panqueca prática de banana',
    time: '10 min',
    difficulty: 'Fácil',
    icon: '🥞',
    ingredients: [
      { name: 'Banana', qty: '2 unidades', matchKeyword: 'banana' },
      { name: 'Ovos', qty: '2 unidades', matchKeyword: 'ovo' },
      { name: 'Canela em pó', qty: '1 pitada', matchKeyword: null }
    ],
    steps: [
      'Amasse as bananas maduras com um garfo.',
      'Misture bem com os ovos batidos.',
      'Despeje em uma frigideira até dourar os dois lados.'
    ]
  },
  {
    id: 'r3',
    title: 'Torta de legumes e queijo',
    time: '40 min',
    difficulty: 'Média',
    icon: '🥧',
    ingredients: [
      { name: 'Tomate', qty: '2 unidades', matchKeyword: 'tomate' },
      { name: 'Queijo muçarela', qty: '150 g', matchKeyword: 'queijo' },
      { name: 'Iogurte natural', qty: '1 xícara', matchKeyword: 'iogurte' }
    ],
    steps: [
      'Pique todos os legumes e o queijo.',
      'Misture com a massa e leve ao forno por 30 minutos.'
    ]
  },
  {
    id: 'r4',
    title: 'Frango grelhado com tomate e queijo',
    time: '25 min',
    difficulty: 'Fácil',
    icon: '🍗',
    ingredients: [
      { name: 'Peito de frango', qty: '500 g', matchKeyword: 'frango' },
      { name: 'Tomate', qty: '1 unidade', matchKeyword: 'tomate' },
      { name: 'Queijo muçarela', qty: '2 fatias', matchKeyword: 'queijo' }
    ],
    steps: [
      'Tempere os filés de frango com sal e alho.',
      'Grelhe em uma frigideira até dourar.',
      'Coloque uma fatia de tomate e o queijo por cima até derreter.'
    ]
  },
  {
    id: 'r5',
    title: 'Omelete cremosa com queijo e hortaliças',
    time: '10 min',
    difficulty: 'Fácil',
    icon: '🍳',
    ingredients: [
      { name: 'Ovos', qty: '3 unidades', matchKeyword: 'ovo' },
      { name: 'Queijo muçarela', qty: '50 g', matchKeyword: 'queijo' },
      { name: 'Alface ou verdura picada', qty: '1 xícara', matchKeyword: 'alface' }
    ],
    steps: [
      'Bata os ovos em uma tigela com uma pitada de sal.',
      'Despeje na frigideira quente e adicione o queijo e as verduras.',
      'Dobre ao meio e sirva imediatamente.'
    ]
  }
];