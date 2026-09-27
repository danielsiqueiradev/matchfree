export const CURRENT_USER = {
  id: 'me',
  name: 'Alex',
  age: 25,
  gender: 'M',
  bio: 'Servo de Deus. Curto culto aos domingos, café com amigos e um bom louvor. Buscando alguém para caminhar junto em Cristo.',
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500',
};

// Replies padrão quando o perfil não define as próprias.
const DEFAULT_REPLIES = [
  'Paz do Senhor! Como vai? 😄',
  'Fico muito feliz de conversar com você!',
  'Vi na sua bio que você também ama a Deus. Que benção! 🙌',
  'Bora marcar um café pra conversar melhor?',
];

export const DECK_PROFILES = [
  {
    id: '1',
    name: 'Camila',
    age: 23,
    gender: 'F',
    distance: 3,
    bio: 'Apaixonada por Jesus e por praia. Ministério de louvor da minha igreja.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500',
    likesMe: true,
    replies: [
      'Paz do Senhor, Alex! Que alegria dar match contigo 🙌',
      'Adorei saber que você também vai ao culto aos domingos!',
      'Qual louvor não sai da tua cabeça essa semana? 🎶',
    ],
  },
  {
    id: '2',
    name: 'Gabriel',
    age: 27,
    gender: 'M',
    distance: 8,
    bio: 'Engenheiro e líder de célula. Procurando um propósito para dois.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    likesMe: false,
    replies: [
      'Fala, Alex! Tudo certo por aí?',
      'Vi que somos da mesma cidade. De qual igreja você é?',
      'Entreguei meu coração pra Deus e agora procuro uma amizade que honre Ele 😊',
    ],
  },
  {
    id: '3',
    name: 'Juliana',
    age: 24,
    gender: 'F',
    distance: 5,
    bio: 'Levo a palavra de Deus nos shows gospel e racho pizza com quem ama Cristo.',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500',
    likesMe: true,
    replies: [
      'Oii! Paz e graça pra você 🙏',
      'Você já foi em algum show gospel? A gente podia combinar de ir juntos!',
      'Adoro gente que sonha junto com Deus.',
    ],
  },
  {
    id: '4',
    name: 'Lucas',
    age: 26,
    gender: 'M',
    distance: 12,
    bio: 'Treino o corpo e a alma. Atleta da fé e estudante de teologia.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500',
    likesMe: false,
    replies: [
      'E aí, beleza? 👊',
      'Cristão de berço, buscando crescer na palavra.',
      'Qual livro da Bíblia mais te marcou?',
    ],
  },
  {
    id: '5',
    name: 'Mariana',
    age: 22,
    gender: 'F',
    distance: 7,
    bio: 'Pedagoga, voluntária no ministério infantil e louca por missões.',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500',
    likesMe: false,
    replies: [
      'Olá! Que bom te conhecer 😊',
      'Trabalho com crianças na igreja e amo o que faço!',
      'Você tem algum ministério favorito?',
    ],
  },
  {
    id: '6',
    name: 'Pedro',
    age: 29,
    gender: 'M',
    distance: 15,
    bio: 'Pastor jovem, apaixonado por discipulado e ciclismo. Provérbios 3:5.',
    photo: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=500',
    likesMe: false,
    replies: [
      'Paz e graça! Seja bem-vindo.',
      'Confio no Senhor pra tudo, inclusive pra conhecer pessoas novas 🙏',
      'O que Deus tem ensinado pra você ultimamente?',
    ],
  },
  {
    id: '7',
    name: 'Fernanda',
    age: 26,
    gender: 'F',
    distance: 4,
    bio: 'Enfermeira e intercessora. Cantora de voz suave e coração missionário.',
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500',
    likesMe: false,
    replies: [
      'Oi! Deus é bom demais, né? 😊',
      'Cuido dos outros no trabalho e na igreja.',
      'Você ora por quem ainda não conhece a Deus?',
    ],
  },
  {
    id: '8',
    name: 'Thiago',
    age: 28,
    gender: 'M',
    distance: 10,
    bio: 'Músico, tocador de violão na igreja e colecionador de Bíblias de estudo.',
    photo: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=500',
    likesMe: false,
    replies: [
      'Salve! Beleza?',
      'Música e fé andam juntas pra mim.',
      'Você já ouviu "Reckless Love" em português? Indico!',
    ],
  },
];

// Perfis que já curtiram o Alex e ficam bloqueados por anúncio na aba "Quem te curtiu".
export const SECRET_ADMIRERS = [
  {
    id: '101',
    name: 'Beatriz',
    age: 25,
    gender: 'F',
    distance: 4,
    bio: 'Professora do EBD e viciada em séries bíblicas. Esperando pelo meu José 🙏',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500',
    likesMe: true,
    replies: [
      'Paz! Fico feliz de te conhecer.',
      'Eu ensino a palavra aos pequenos e adoro isso.',
      'Você lê a Bíblia todos os dias? Vamos ler juntos!',
    ],
  },
  {
    id: '102',
    name: 'Rafael',
    age: 28,
    gender: 'M',
    distance: 9,
    bio: 'Skate, vinil e fotografia. Cristão reformado, buscando alguém de visão missionária.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500',
    likesMe: true,
    replies: [
      'Fala, irmão em Cristo!',
      'Fotografia é minha paixão depois de Deus.',
      'Já pensou em visitar uma igreja diferente esse domingo?',
    ],
  },
  {
    id: '103',
    name: 'Isabela',
    age: 24,
    gender: 'F',
    distance: 6,
    bio: 'Estudante de enfermagem, ama oração e poesia. Lâmpada para os outros.',
    photo: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500',
    likesMe: true,
    replies: [
      'Paz do Senhor! Que legal esse match.',
      'Adoro escrever cartas pra Deus e pros amigos.',
      'Você já participou de algum retiro?',
    ],
  },
  {
    id: '104',
    name: 'Mateus',
    age: 30,
    gender: 'M',
    distance: 11,
    bio: 'Surfista, pai de pet e dedicado a grupos de homens. Rm 8:28.',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500',
    likesMe: true,
    replies: [
      'Opa! Deus no comando, como sempre.',
      'Surfo de manhã e oro em grupo à noite.',
      'Tua igreja tem grupo de homens?',
    ],
  },
];

export const DEFAULT_PREFERENCES = {
  minAge: 18,
  maxAge: 40,
  maxDistance: 50,
  showMen: true,
  showWomen: true,
};

// Economia já acumulada pelo usuário no histórico do MVP.
export const SAVINGS_BASE = 50;
// Cada anúncio assistido "economiza" o equivalente a um dia de assinatura premium.
export const SAVINGS_PER_AD = 5;
export const AD_DURATION_SECONDS = 15;

export function repliesFor(profile) {
  return (profile && profile.replies) || DEFAULT_REPLIES;
}
