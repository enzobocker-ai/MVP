// js/data.js

export const defaultFoods = [
  { id: '1', name: 'Tomate', quantity: 4, unit: 'un', expiryDate: '2026-10-06', location: 'Na geladeira', icon: '🍅' },
  { id: '2', name: 'Leite Integral', quantity: 1, unit: 'L', expiryDate: '2026-10-05', location: 'Na geladeira', icon: '🥛' },
  { id: '3', name: 'Pão de Forma', quantity: 6, unit: 'fatia', expiryDate: '2026-10-08', location: 'Na despensa', icon: '🍞' },
  { id: '4', name: 'Banana Prata', quantity: 5, unit: 'un', expiryDate: '2026-10-04', location: 'Na fruteira', icon: '🍌' },
  { id: '5', name: 'Queijo Muçarela', quantity: 200, unit: 'g', expiryDate: '2026-10-10', location: 'Na geladeira', icon: '🧀' }
];

export const offersData = [
  {
    id: 'o1',
    title: 'Tomate Italiano Lote Promocional',
    market: 'Supermercado Fort Atacadista',
    distance: 'Trindade • 1.2 km',
    mapsLink: 'https://maps.google.com',
    price: 3.49,
    oldPrice: 6.99,
    discount: '-50%',
    validity: '2026-10-08',
    weight: '1 kg',
    category: 'Frutas e verduras',
    icon: '🍅'
  },
  {
    id: 'o2',
    title: 'Leite Fermentado 6un',
    market: 'Bistek Supermercados',
    distance: 'Costeira • 2.5 km',
    mapsLink: 'https://maps.google.com',
    price: 4.50,
    oldPrice: 8.90,
    discount: '-49%',
    validity: '2026-10-07',
    weight: '480g',
    category: 'Laticínios',
    icon: '🥛'
  },
  {
    id: 'o3',
    title: 'Pão Francês Fresquinho Lote Tarde',
    market: 'Padaria Tradição da Ilha',
    distance: 'Centro • 0.8 km',
    mapsLink: 'https://maps.google.com',
    price: 5.00,
    oldPrice: 12.00,
    discount: '-58%',
    validity: '2026-10-05',
    weight: '500g',
    category: 'Padaria',
    icon: '🥖'
  },
  {
    id: 'o4',
    title: 'Peito de Frango Refrimado',
    market: 'Hipermercado Angeloni',
    distance: 'Agronômica • 3.1 km',
    mapsLink: 'https://maps.google.com',
    price: 11.90,
    oldPrice: 19.90,
    discount: '-40%',
    validity: '2026-10-09',
    weight: '1 kg',
    category: 'Carnes e Frios',
    icon: '🥩'
  },
  {
    id: 'o5',
    title: 'Banana Caturra Bem Madura',
    market: 'Sacolão Direto do Campo',
    distance: 'Itacorubi • 1.7 km',
    mapsLink: 'https://maps.google.com',
    price: 2.19,
    oldPrice: 4.99,
    discount: '-56%',
    validity: '2026-10-06',
    weight: '1 kg',
    category: 'Frutas e verduras',
    icon: '🍌'
  }
];

export const recipesData = [
  {
    id: 'r1',
    title: 'Omelete Nutritiva de Talos e Sobras',
    icon: '🍳',
    time: '10 min',
    difficulty: 'Fácil',
    type: 'salgado',
    ingredients: [
      { name: 'Ovos', qty: '2 unidades', matchKeyword: 'ovo' },
      { name: 'Tomate picado', qty: '1 unidade', matchKeyword: 'tomate' },
      { name: 'Queijo ou frios picados', qty: '50g', matchKeyword: 'queijo' }
    ],
    steps: [
      'Bata os ovos em uma tigela com uma pitada de sal e pimenta.',
      'Adicione o tomate e o queijo picados.',
      'Despeje em uma frigideira untada em fogo médio até dourar os dois lados.'
    ]
  },
  {
    id: 'r2',
    title: 'Doce Cremoso de Casca de Banana',
    icon: '🍌',
    time: '25 min',
    difficulty: 'Fácil',
    type: 'doce',
    ingredients: [
      { name: 'Bananas bem maduras (com casca)', qty: '4 unidades', matchKeyword: 'banana' },
      { name: 'Açúcar ou Adoçante', qty: '1/2 xícara', matchKeyword: null },
      { name: 'Canela em pó', qty: '1 colher de chá', matchKeyword: null }
    ],
    steps: [
      'Lave bem as cascas de banana e corte em tiras finas.',
      'Lève ao fogo baixo com o açúcar e um pouco de água.',
      'Cozinhe mexendo sempre até virar uma geleia consistente e finalize com canela.'
    ]
  },
  {
    id: 'r3',
    title: 'Torradas Temperadas com Pão Dormido',
    icon: '🍞',
    time: '15 min',
    difficulty: 'Fácil',
    type: 'salgado',
    ingredients: [
      { name: 'Pão de forma ou pão francês dormido', qty: '4 fatias', matchKeyword: 'pão' },
      { name: 'Azeite ou Manteiga', qty: '2 colheres de sopa', matchKeyword: null },
      { name: 'Orégano e Ervas', qty: 'A gosto', matchKeyword: null }
    ],
    steps: [
      'Corte o pão em cubos ou fatias finas.',
      'Pincele azeite e polvilhe orégano e sal.',
      'Lève ao forno pré-aquecido a 180°C por 10 minutos até ficas bem crocantes.'
    ]
  },
  {
    id: 'r4',
    title: 'Smoothie Proteico de Frutas Maduras',
    icon: '🥤',
    time: '5 min',
    difficulty: 'Muito Fácil',
    type: 'doce',
    ingredients: [
      { name: 'Banana congelada ou madura', qty: '2 unidades', matchKeyword: 'banana' },
      { name: 'Leite', qty: '200ml', matchKeyword: 'leite' }
    ],
    steps: [
      'Coloque as bananas e o leite no liquidificador.',
      'Bata em velocidade alta por 2 minutos até ficar cremoso e homogêneo.',
      'Sirva gelado imediatamente.'
    ]
  },
  {
    id: 'r5',
    title: 'Sopa Cremosa de Legumes Sustentável',
    icon: '🍲',
    time: '30 min',
    difficulty: 'Média',
    type: 'salgado',
    ingredients: [
      { name: 'Tomate', qty: '2 unidades', matchKeyword: 'tomate' },
      { name: 'Batata ou Mandioca', qty: '2 unidades', matchKeyword: null },
      { name: 'Queijo ralado para finalizar', qty: 'A gosto', matchKeyword: 'queijo' }
    ],
    steps: [
      'Cozinhe todos os legumes em água temperada com sal e alho.',
      'Bata no liquidificador com a própria água do cozimento.',
      'Volte para a panela, acerte o tempero e sirva com queijo por cima.'
    ]
  },
  {
    id: 'r6',
    title: 'Bolinho de Arroz com Queijo',
    icon: '🧆',
    time: '20 min',
    difficulty: 'Fácil',
    type: 'salgado',
    ingredients: [
      { name: 'Sobras de Arroz cozido', qty: '2 xícaras', matchKeyword: null },
      { name: 'Ovos', qty: '1 unidade', matchKeyword: 'ovo' },
      { name: 'Queijo muçarela picado', qty: '100g', matchKeyword: 'queijo' }
    ],
    steps: [
      'Misture o arroz, o ovo e o queijo em uma tigela.',
      'Amasse bem até dar liga e forme pequenas bolinhas com as mãos.',
      'Asse na Airfryer por 15 minutos a 180°C ou frite até dourar.'
    ]
  },
  {
    id: 'r7',
    title: 'Mousse Express de Maçã e Banana',
    icon: '🍧',
    time: '10 min',
    difficulty: 'Fácil',
    type: 'doce',
    ingredients: [
      { name: 'Bananas bem maduras', qty: '3 unidades', matchKeyword: 'banana' },
      { name: 'Leite', qty: '100ml', matchKeyword: 'leite' }
    ],
    steps: [
      'Bata as bananas no processador até virar um purê liso.',
      'Adicione o leite aos poucos e bata até aerar.',
      'Leve à geladeira por 30 minutos antes de servir.'
    ]
  }
];