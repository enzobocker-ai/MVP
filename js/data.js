// js/data.js

// ============================================================================
// 1. INVENTÁRIO INICIAL DO CONSUMIDOR (Variedade Rica por Classes)
// ============================================================================
export const defaultFoods = [
  // HORTIFRUTI
  { id: 'f1', name: 'Tomate Italiano', quantity: 6, unit: 'un', expiryDate: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0], location: 'Na fruteira', icon: '🍅' },
  { id: 'f2', name: 'Cebola Branca', quantity: 4, unit: 'un', expiryDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0], location: 'Na fruteira', icon: '🧅' },
  { id: 'f3', name: 'Alho', quantity: 2, unit: 'un', expiryDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0], location: 'Na fruteira', icon: '🧄' },
  { id: 'f4', name: 'Batata Inglesa', quantity: 1, unit: 'kg', expiryDate: new Date(Date.now() + 12 * 86400000).toISOString().split('T')[0], location: 'Na fruteira', icon: '🥔' },
  { id: 'f5', name: 'Cenoura', quantity: 3, unit: 'un', expiryDate: new Date(Date.now() + 8 * 86400000).toISOString().split('T')[0], location: 'Na geladeira', icon: '🥕' },
  { id: 'f6', name: 'Banana Prata', quantity: 5, unit: 'un', expiryDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0], location: 'Na fruteira', icon: '🍌' },
  { id: 'f7', name: 'Maçã Gala', quantity: 4, unit: 'un', expiryDate: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0], location: 'Na fruteira', icon: '🍎' },
  { id: 'f8', name: 'Limão Tahiti', quantity: 6, unit: 'un', expiryDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0], location: 'Na fruteira', icon: '🍋' },
  
  // LATICÍNIOS & PROTEÍNAS
  { id: 'p1', name: 'Leite Integral', quantity: 2, unit: 'L', expiryDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0], location: 'Na geladeira', icon: '🥛' },
  { id: 'p2', name: 'Ovos Brancos', quantity: 12, unit: 'un', expiryDate: new Date(Date.now() + 20 * 86400000).toISOString().split('T')[0], location: 'Na geladeira', icon: '🥚' },
  { id: 'p3', name: 'Peito de Frango', quantity: 800, unit: 'g', expiryDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], location: 'Na geladeira', icon: '🍗' },
  { id: 'p4', name: 'Carne Moída', quantity: 500, unit: 'g', expiryDate: new Date(Date.now() + 1 * 86400000).toISOString().split('T')[0], location: 'Na geladeira', icon: '🥩' },
  
  // DESPENSA / GRÃOS / CEREAIS
  { id: 'd1', name: 'Arroz Branco', quantity: 2, unit: 'kg', expiryDate: new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0], location: 'Na despensa', icon: '🍚' },
  { id: 'd2', name: 'Feijão Carioca', quantity: 1, unit: 'kg', expiryDate: new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0], location: 'Na despensa', icon: '🫘' },
  { id: 'd3', name: 'Macarrão Espaguete', quantity: 500, unit: 'g', expiryDate: new Date(Date.now() + 300 * 86400000).toISOString().split('T')[0], location: 'Na despensa', icon: '🍝' },
  { id: 'd4', name: 'Aveia em Flocos', quantity: 300, unit: 'g', expiryDate: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0], location: 'Na despensa', icon: '🌾' }
];

// ============================================================================
// 2. OFERTAS LOCAIS (Prontas para cobrir lacunas nas receitas)
// ============================================================================
export const offersData = [
  {
    id: 'off_1', title: 'Queijo Muçarela Fatiado', baseName: 'Queijo Muçarela', market: 'Mercado Imperatriz', distance: 'Trindade - 0.8 km', mapsLink: '', price: 4.99, oldPrice: 9.99, discount: '-50%', validity: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0], weight: '200g', category: 'Laticínios', icon: '🧀', stock: 12
  },
  {
    id: 'off_2', title: 'Farinha de Trigo Branca', baseName: 'Farinha de Trigo', market: 'Supermercados Angeloni', distance: 'Santa Mônica - 1.2 km', mapsLink: '', price: 3.49, oldPrice: 5.99, discount: '-40%', validity: new Date(Date.now() + 120 * 86400000).toISOString().split('T')[0], weight: '1kg', category: 'Padaria', icon: '🌾', stock: 20
  },
  {
    id: 'off_3', title: 'Creme de Leite Nestlé', baseName: 'Creme de Leite', market: 'Hortifruti Direto do Campo', distance: 'Agronômica - 2.5 km', mapsLink: '', price: 2.99, oldPrice: 4.50, discount: '-33%', validity: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0], weight: '200g', category: 'Laticínios', icon: '🥛', stock: 15
  },
  {
    id: 'off_4', title: 'Molho de Tomate Tradicional', baseName: 'Molho de Tomate', market: 'Mercado Imperatriz', distance: 'Trindade - 0.8 km', mapsLink: '', price: 1.99, oldPrice: 3.50, discount: '-43%', validity: new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0], weight: '340g', category: 'Padaria', icon: '🥫', stock: 30
  },
  {
    id: 'off_5', title: 'Linguiça Calabresa Fina', baseName: 'Linguiça Calabresa', market: 'Açougue Central', distance: 'Centro - 3.0 km', mapsLink: '', price: 12.90, oldPrice: 19.90, discount: '-35%', validity: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0], weight: '500g', category: 'Carnes e Frios', icon: '🥓', stock: 8
  },
  {
    id: 'off_6', title: 'Couve Manteiga Maço', baseName: 'Couve Manteiga', market: 'Hortifruti Direto do Campo', distance: 'Agronômica - 2.5 km', mapsLink: '', price: 1.50, oldPrice: 3.00, discount: '-50%', validity: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], weight: '1 maço', category: 'Frutas e verduras', icon: '🥬', stock: 10
  }
];

// ============================================================================
// 3. BASE DE RECEITAS INTELIGENTE (Cruzamento de Dados Aperfeiçoado)
// ============================================================================
// matchKeyword = A palavra que o app procura no nome do alimento do usuário.
// null = Ingrediente básico que assumimos que o usuário tem (sal, azeite, etc).
export const recipesData = [
  {
    id: 'r1', title: 'Omelete Rápido de Queijo e Tomate', icon: '🍳', time: '10 min', difficulty: 'Fácil', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=omelete+queijo+tomate', youtubeLink: 'https://www.youtube.com/results?search_query=receita+omelete+queijo+tomate',
    ingredients: [
      { name: 'Ovos', qty: '2 a 3 unidades', matchKeyword: 'ovo' },
      { name: 'Tomate', qty: '1/2 unidade picada', matchKeyword: 'tomate' },
      { name: 'Queijo Muçarela', qty: '1 fatia', matchKeyword: 'queijo' },
      { name: 'Sal e Pimenta', qty: 'A gosto', matchKeyword: null },
      { name: 'Azeite', qty: '1 fio', matchKeyword: null }
    ],
    steps: ['Bata os ovos com sal e pimenta.', 'Aqueça o azeite na frigideira e despeje os ovos.', 'Adicione o tomate picado e o queijo.', 'Dobre ao meio e deixe o queijo derreter.']
  },
  {
    id: 'r2', title: 'Molho de Tomate Caseiro', icon: '🥫', time: '25 min', difficulty: 'Fácil', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=molho+de+tomate+caseiro', youtubeLink: 'https://www.youtube.com/results?search_query=receita+molho+tomate+caseiro',
    ingredients: [
      { name: 'Tomate', qty: '4 unidades', matchKeyword: 'tomate' },
      { name: 'Cebola', qty: '1/2 unidade', matchKeyword: 'cebola' },
      { name: 'Alho', qty: '2 dentes', matchKeyword: 'alho' },
      { name: 'Azeite', qty: '2 colheres', matchKeyword: null },
      { name: 'Sal e Orégano', qty: 'A gosto', matchKeyword: null }
    ],
    steps: ['Pique a cebola e o alho e refogue no azeite.', 'Corte os tomates em cubos e adicione à panela.', 'Cozinhe em fogo baixo até desmanchar.', 'Tempere com sal e orégano.']
  },
  {
    id: 'r3', title: 'Macarrão Alho e Óleo', icon: '🍝', time: '15 min', difficulty: 'Fácil', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=macarrao+alho+oleo', youtubeLink: 'https://www.youtube.com/results?search_query=receita+macarrao+alho+oleo',
    ingredients: [
      { name: 'Macarrão', qty: '200g', matchKeyword: 'macarrão' },
      { name: 'Alho', qty: '4 dentes fatiados', matchKeyword: 'alho' },
      { name: 'Azeite', qty: '1/4 de xícara', matchKeyword: null },
      { name: 'Sal e Pimenta Preta', qty: 'A gosto', matchKeyword: null }
    ],
    steps: ['Cozinhe o macarrão em água e sal.', 'Numa frigideira grande, doure o alho no azeite em fogo muito baixo.', 'Junte o macarrão cozido e misture bem.']
  },
  {
    id: 'r4', title: 'Arroz de Forno Cremoso', icon: '🍲', time: '30 min', difficulty: 'Médio', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=arroz+de+forno', youtubeLink: 'https://www.youtube.com/results?search_query=receita+arroz+de+forno+sobras',
    ingredients: [
      { name: 'Arroz Cozido', qty: '3 xícaras', matchKeyword: 'arroz' },
      { name: 'Peito de Frango Desfiado', qty: '200g', matchKeyword: 'frango' },
      { name: 'Queijo', qty: '150g', matchKeyword: 'queijo' },
      { name: 'Creme de Leite', qty: '1 caixinha', matchKeyword: 'creme de leite' },
      { name: 'Cebola', qty: '1/2 unidade', matchKeyword: 'cebola' }
    ],
    steps: ['Refogue a cebola e misture o frango.', 'Num refratário, misture o arroz, o frango e o creme de leite.', 'Cubra com o queijo e leve ao forno para gratinar.']
  },
  {
    id: 'r5', title: 'Purê de Batata Clássico', icon: '🥔', time: '20 min', difficulty: 'Fácil', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=pure+de+batata', youtubeLink: 'https://www.youtube.com/results?search_query=receita+pure+de+batata',
    ingredients: [
      { name: 'Batata Inglesa', qty: '4 unidades médias', matchKeyword: 'batata' },
      { name: 'Leite', qty: '1/2 xícara', matchKeyword: 'leite' },
      { name: 'Manteiga', qty: '2 colheres', matchKeyword: null },
      { name: 'Sal', qty: 'A gosto', matchKeyword: null }
    ],
    steps: ['Cozinhe as batatas até ficarem bem macias.', 'Amasse as batatas.', 'Numa panela, junte a batata amassada, o leite, a manteiga e o sal. Mexa até ficar homogêneo.']
  },
  {
    id: 'r6', title: 'Strogonoff Simples de Frango', icon: '🍛', time: '25 min', difficulty: 'Fácil', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=strogonoff+de+frango', youtubeLink: 'https://www.youtube.com/results?search_query=receita+strogonoff+de+frango',
    ingredients: [
      { name: 'Frango em cubos', qty: '500g', matchKeyword: 'frango' },
      { name: 'Cebola', qty: '1 unidade', matchKeyword: 'cebola' },
      { name: 'Molho de Tomate', qty: '1 xícara', matchKeyword: 'molho de tomate' },
      { name: 'Creme de Leite', qty: '1 caixinha', matchKeyword: 'creme de leite' },
      { name: 'Óleo e Sal', qty: 'A gosto', matchKeyword: null }
    ],
    steps: ['Refogue a cebola e doure o frango.', 'Adicione o molho de tomate e cozinhe por 5 minutos.', 'Desligue o fogo, misture o creme de leite e sirva com arroz.']
  },
  {
    id: 'r7', title: 'Panqueca Doce Fit (Aveia e Banana)', icon: '🥞', time: '10 min', difficulty: 'Fácil', type: 'doce',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=panqueca+de+banana+com+aveia', youtubeLink: 'https://www.youtube.com/results?search_query=receita+panqueca+banana+aveia',
    ingredients: [
      { name: 'Banana Prata', qty: '1 unidade bem madura', matchKeyword: 'banana' },
      { name: 'Ovo', qty: '1 unidade', matchKeyword: 'ovo' },
      { name: 'Aveia em Flocos', qty: '2 colheres de sopa', matchKeyword: 'aveia' },
      { name: 'Canela', qty: 'Uma pitada', matchKeyword: null }
    ],
    steps: ['Amasse a banana com um garfo.', 'Misture o ovo, a aveia e a canela até formar uma massa.', 'Aqueça uma frigideira antiaderente e doure a panqueca dos dois lados.']
  },
  {
    id: 'r8', title: 'Bolo de Maçã de Liquidificador', icon: '🍰', time: '45 min', difficulty: 'Médio', type: 'doce',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=bolo+de+maça+liquidificador', youtubeLink: 'https://www.youtube.com/results?search_query=receita+bolo+maca+liquidificador',
    ingredients: [
      { name: 'Maçã', qty: '2 unidades (usar cascas também)', matchKeyword: 'maçã' },
      { name: 'Ovos', qty: '3 unidades', matchKeyword: 'ovo' },
      { name: 'Farinha de Trigo', qty: '2 xícaras', matchKeyword: 'farinha' },
      { name: 'Óleo', qty: '1/2 xícara', matchKeyword: null },
      { name: 'Açúcar e Fermento', qty: 'A gosto', matchKeyword: null }
    ],
    steps: ['Bata no liquidificador os ovos, o óleo e as cascas das maçãs.', 'Pique as maçãs em cubos.', 'Numa tigela, misture o líquido batido com a farinha, o açúcar, as maçãs picadas e o fermento.', 'Asse a 180°C por 35 minutos.']
  },
  {
    id: 'r9', title: 'Vitamina Energética de Maçã e Banana', icon: '🥤', time: '5 min', difficulty: 'Fácil', type: 'bebida',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=vitamina+maca+banana', youtubeLink: 'https://www.youtube.com/results?search_query=vitamina+maca+banana',
    ingredients: [
      { name: 'Banana', qty: '1 unidade', matchKeyword: 'banana' },
      { name: 'Maçã', qty: '1/2 unidade', matchKeyword: 'maçã' },
      { name: 'Leite', qty: '250 ml', matchKeyword: 'leite' },
      { name: 'Aveia', qty: '1 colher de sopa', matchKeyword: 'aveia' }
    ],
    steps: ['Corte as frutas em pedaços.', 'Coloque todos os ingredientes no liquidificador.', 'Bata até ficar cremoso e sirva gelado.']
  },
  {
    id: 'r10', title: 'Carne de Panela com Legumes', icon: '🥘', time: '40 min', difficulty: 'Médio', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=carne+de+panela+com+batata', youtubeLink: 'https://www.youtube.com/results?search_query=carne+de+panela+com+batata',
    ingredients: [
      { name: 'Carne (em cubos)', qty: '500g', matchKeyword: 'carne' },
      { name: 'Batata', qty: '2 unidades cortadas', matchKeyword: 'batata' },
      { name: 'Cenoura', qty: '1 unidade cortada', matchKeyword: 'cenoura' },
      { name: 'Cebola', qty: '1 unidade', matchKeyword: 'cebola' },
      { name: 'Alho', qty: '2 dentes', matchKeyword: 'alho' }
    ],
    steps: ['Doure a carne com a cebola e o alho na panela de pressão.', 'Adicione água até cobrir e cozinhe na pressão por 25 minutos.', 'Abra, coloque a batata e a cenoura e cozinhe sem pressão até os legumes amolecerem.']
  },
  {
    id: 'r11', title: 'Sopa Cremosa de Batata e Cenoura', icon: '🥣', time: '30 min', difficulty: 'Fácil', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=sopa+cremosa+legumes', youtubeLink: 'https://www.youtube.com/results?search_query=sopa+cremosa+batata+cenoura',
    ingredients: [
      { name: 'Batata', qty: '3 unidades', matchKeyword: 'batata' },
      { name: 'Cenoura', qty: '2 unidades', matchKeyword: 'cenoura' },
      { name: 'Cebola', qty: '1 unidade', matchKeyword: 'cebola' },
      { name: 'Macarrão', qty: '1 punhado', matchKeyword: 'macarrão' },
      { name: 'Azeite e Sal', qty: 'A gosto', matchKeyword: null }
    ],
    steps: ['Refogue a cebola no azeite.', 'Cozinhe a batata e a cenoura na água até ficarem macias. Bata tudo no liquidificador para criar o creme.', 'Volte o creme para a panela, adicione o macarrão e cozinhe até a massa amolecer.']
  },
  {
    id: 'r12', title: 'Torta Salgada Rápida de Liquidificador', icon: '🥧', time: '40 min', difficulty: 'Médio', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=torta+de+liquidificador', youtubeLink: 'https://www.youtube.com/results?search_query=torta+salgada+liquidificador',
    ingredients: [
      { name: 'Farinha de Trigo', qty: '2 xícaras', matchKeyword: 'farinha' },
      { name: 'Leite', qty: '2 xícaras', matchKeyword: 'leite' },
      { name: 'Ovos', qty: '3 unidades', matchKeyword: 'ovo' },
      { name: 'Frango ou Carne (Sobra)', qty: '2 xícaras', matchKeyword: 'frango' },
      { name: 'Tomate (Para o recheio)', qty: '1 unidade', matchKeyword: 'tomate' },
      { name: 'Óleo e Fermento', qty: 'Necessários', matchKeyword: null }
    ],
    steps: ['Bata o leite, o óleo, os ovos, a farinha, o sal e o fermento no liquidificador.', 'Despeje metade da massa numa forma untada.', 'Coloque o frango desfiado com o tomate picado.', 'Cubra com o resto da massa e asse por 35 minutos.']
  },
  {
    id: 'r13', title: 'Feijão Tropeiro Prático', icon: '🥘', time: '20 min', difficulty: 'Médio', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=feijao+tropeiro', youtubeLink: 'https://www.youtube.com/results?search_query=feijao+tropeiro+simples',
    ingredients: [
      { name: 'Feijão (cozido sem caldo)', qty: '2 xícaras', matchKeyword: 'feijão' },
      { name: 'Linguiça Calabresa', qty: '1 unidade', matchKeyword: 'linguiça' },
      { name: 'Couve', qty: '1 maço picado', matchKeyword: 'couve' },
      { name: 'Farinha (Mandioca/Trigo)', qty: '1 xícara', matchKeyword: 'farinha' },
      { name: 'Cebola e Alho', qty: 'A gosto', matchKeyword: 'cebola' }
    ],
    steps: ['Frite bem a linguiça na própria gordura.', 'Adicione cebola e alho até murchar.', 'Jogue a couve picada e mexa por 1 minuto.', 'Misture o feijão e, por último, vá colocando a farinha até dar o ponto desejado.']
  },
  {
    id: 'r14', title: 'Limonada Suíça Cremosa', icon: '🍋', time: '5 min', difficulty: 'Fácil', type: 'bebida',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=limonada+suica', youtubeLink: 'https://www.youtube.com/results?search_query=limonada+suica',
    ingredients: [
      { name: 'Limão', qty: '2 unidades', matchKeyword: 'limão' },
      { name: 'Leite ou Leite Condensado', qty: 'A gosto', matchKeyword: 'leite' },
      { name: 'Água e Gelo', qty: '500ml', matchKeyword: null },
      { name: 'Açúcar', qty: 'A gosto', matchKeyword: null }
    ],
    steps: ['Lave bem os limões, corte em 4 e retire a parte branca do meio para não amargar.', 'Bata os limões com casca, água, leite (ou leite condensado) e açúcar no liquidificador por 10 segundos.', 'Coe imediatamente e sirva com gelo.']
  },
  {
    id: 'r15', title: 'Salada Refrescante de Cenoura e Maçã', icon: '🥗', time: '10 min', difficulty: 'Fácil', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=salada+cenoura+maca', youtubeLink: 'https://www.youtube.com/results?search_query=salada+de+cenoura+com+maca',
    ingredients: [
      { name: 'Cenoura', qty: '1 unidade ralada', matchKeyword: 'cenoura' },
      { name: 'Maçã', qty: '1 unidade em cubos', matchKeyword: 'maçã' },
      { name: 'Limão', qty: 'Suco de 1/2 limão', matchKeyword: 'limão' },
      { name: 'Sal e Azeite', qty: 'A gosto', matchKeyword: null }
    ],
    steps: ['Rale a cenoura e pique a maçã em cubos.', 'Esprema o limão sobre a maçã para ela não escurecer.', 'Misture tudo, tempere com azeite e sal e sirva frio.']
  },
  {
    id: 'r16', title: 'Bife Acebolado Suculento', icon: '🥩', time: '15 min', difficulty: 'Fácil', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=bife+acebolado', youtubeLink: 'https://www.youtube.com/results?search_query=bife+acebolado',
    ingredients: [
      { name: 'Carne (Bifes)', qty: '500g', matchKeyword: 'carne' },
      { name: 'Cebola', qty: '1 unidade em rodelas', matchKeyword: 'cebola' },
      { name: 'Alho', qty: '2 dentes amassados', matchKeyword: 'alho' },
      { name: 'Sal e Óleo', qty: 'A gosto', matchKeyword: null }
    ],
    steps: ['Tempere a carne com sal e alho.', 'Aqueça uma frigideira com óleo e frite os bifes dos dois lados. Retire.', 'Na mesma frigideira, jogue a cebola e refogue aproveitando o fundo da panela até dourar. Cubra a carne.']
  },
  {
    id: 'r17', title: 'Escondidinho de Carne Moída', icon: '🍲', time: '40 min', difficulty: 'Médio', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=escondidinho+de+carne+moida', youtubeLink: 'https://www.youtube.com/results?search_query=escondidinho+carne+moida',
    ingredients: [
      { name: 'Carne Moída', qty: '500g', matchKeyword: 'carne' },
      { name: 'Batata', qty: '4 unidades', matchKeyword: 'batata' },
      { name: 'Queijo', qty: '100g', matchKeyword: 'queijo' },
      { name: 'Cebola', qty: '1/2 unidade', matchKeyword: 'cebola' },
      { name: 'Molho de Tomate', qty: '1/2 xícara', matchKeyword: 'molho de tomate' }
    ],
    steps: ['Cozinhe as batatas e faça um purê com um pouco de sal e água.', 'Refogue a carne com cebola e molho de tomate.', 'Numa travessa, coloque a carne, cubra com o purê e jogue o queijo por cima.', 'Gratine no forno até o queijo derreter.']
  },
  {
    id: 'r18', title: 'Suco Verde Detox', icon: '🥤', time: '5 min', difficulty: 'Fácil', type: 'bebida',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=suco+verde', youtubeLink: 'https://www.youtube.com/results?search_query=suco+verde',
    ingredients: [
      { name: 'Couve', qty: '1 a 2 folhas', matchKeyword: 'couve' },
      { name: 'Limão', qty: 'Suco de 1 limão', matchKeyword: 'limão' },
      { name: 'Maçã', qty: '1 unidade', matchKeyword: 'maçã' },
      { name: 'Água Gelada', qty: '300ml', matchKeyword: null }
    ],
    steps: ['Lave bem a couve e a maçã.', 'Corte a maçã tirando as sementes.', 'Coloque tudo no liquidificador junto com o suco de limão e a água.', 'Bata muito bem, coe se preferir, e beba logo em seguida.']
  },
  {
    id: 'r19', title: 'Salada Caprese Simples', icon: '🥗', time: '5 min', difficulty: 'Fácil', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=salada+caprese', youtubeLink: 'https://www.youtube.com/results?search_query=salada+caprese',
    ingredients: [
      { name: 'Tomate', qty: '2 unidades', matchKeyword: 'tomate' },
      { name: 'Queijo (Fresco/Muçarela)', qty: '150g', matchKeyword: 'queijo' },
      { name: 'Azeite', qty: 'Generoso', matchKeyword: null },
      { name: 'Sal e Orégano', qty: 'A gosto', matchKeyword: null }
    ],
    steps: ['Fatie o tomate em rodelas médias.', 'Fatie o queijo.', 'Intercale uma fatia de tomate com uma de queijo no prato.', 'Regue abundantemente com azeite, salpique sal e orégano.']
  },
  {
    id: 'r20', title: 'Frango Grelhado com Limão e Alho', icon: '🍗', time: '20 min', difficulty: 'Fácil', type: 'salgado',
    websiteLink: 'https://www.tudogostoso.com.br/busca?q=frango+limao', youtubeLink: 'https://www.youtube.com/results?search_query=frango+limao+alho',
    ingredients: [
      { name: 'Peito de Frango', qty: '500g em filés', matchKeyword: 'frango' },
      { name: 'Limão', qty: 'Suco de 2 unidades', matchKeyword: 'limão' },
      { name: 'Alho', qty: '3 dentes amassados', matchKeyword: 'alho' },
      { name: 'Sal e Azeite', qty: 'A gosto', matchKeyword: null }
    ],
    steps: ['Numa tigela, tempere os filés com o suco de limão, o alho e o sal. Deixe marinar por 10 minutos.', 'Aqueça uma frigideira com um pouco de azeite.', 'Grelhe o frango de um lado até dourar, vire e doure do outro.', 'Sirva com arroz ou salada.']
  }
];