export const CURRENT_USER = {
  id: 'me',
  name: 'Alex',
  age: 25,
  bio: 'Curto uma cerveja gelada, um bom papo e um rolê no fim de semana. Bora de match!',
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500',
};

export const DECK_PROFILES = [
  {
    id: '1',
    name: 'Camila',
    age: 23,
    distance: 3,
    bio: 'Apaixonada por praia, café e cachorros.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500',
    likesMe: true,
  },
  {
    id: '2',
    name: 'Gabriel',
    age: 27,
    distance: 8,
    bio: 'Engenheiro nas horas vagas, cozinheiro no fim de semana.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    likesMe: false,
  },
  {
    id: '3',
    name: 'Juliana',
    age: 24,
    distance: 5,
    bio: 'Procuro alguém pra ir em shows e rachar uma pizza.',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500',
    likesMe: true,
  },
  {
    id: '4',
    name: 'Lucas',
    age: 26,
    distance: 12,
    bio: 'Treino pesado, leio livros e não vivo sem música.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500',
    likesMe: false,
  },
];

// Perfis que já curtiram o Alex e ficam bloqueados por anúncio na aba "Quem te curtiu".
export const SECRET_ADMIRERS = [
  {
    id: '101',
    name: 'Beatriz',
    age: 25,
    distance: 4,
    bio: 'Viciada em séries policiais e brigadeiro de colher.',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500',
    likesMe: true,
  },
  {
    id: '102',
    name: 'Rafael',
    age: 28,
    distance: 9,
    bio: 'Skate, vinil e fotografia analógica.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500',
    likesMe: true,
  },
];

export const DEFAULT_PREFERENCES = {
  minAge: 18,
  maxAge: 40,
  maxDistance: 50,
};

// Economia já acumulada pelo usuário no histórico do MVP.
export const SAVINGS_BASE = 50;
// Cada anúncio assistido "economiza" o equivalente a um dia de assinatura premium.
export const SAVINGS_PER_AD = 5;
export const AD_DURATION_SECONDS = 15;
