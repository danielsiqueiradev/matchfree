export const CURRENT_USER = {
  id: 'me',
  name: 'Daniel',
  age: 38,
  gender: 'M',
  location: 'Maricá, Rio de Janeiro',
  church: 'Igreja Batista Central',
  denomination: 'Batista',
  verse: 'Provérbios 3:5-6',
  ministry: 'Louvor',
  bio: 'Servo de Deus. Curto culto aos domingos, café com amigos e um bom louvor. Buscando alguém para caminhar junto em Cristo.',
  // Religião
  churchActivities: 'Louvor',
  churchFrequency: 'Toda semana',
  // Dados gerais
  livesIn: 'Maricá',
  maritalStatus: 'Solteiro(a)',
  children: 'Não tenho',
  education: 'Superior completo',
  profession: 'Engenheiro',
  sports: 'Corrida, Futebol',
  hobbies: 'Leitura, Violão',
  // Aparência
  height: 178,
  weight: 82,
  bodyType: 'Atlético',
  ethnicity: 'Parda',
  hairColor: 'Castanho',
  hairType: 'Ondulado',
  eyeColor: 'Castanho',
  loveLanguage: 'Atos de Serviço',
  // Perfil que eu busco
  seeking: {
    church: 'Evangélica',
    relationshipType: 'Casamento',
    minAge: 25,
    maxAge: 35,
    minHeight: 150,
    maxHeight: 175,
    children: 'Sem preferência',
    bodyType: 'Sem preferência',
    valuedTraits: 'Fé, família e bom humor',
    otherTraits: '',
    getAlong: 'Você amar a Deus acima de tudo',
  },
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500',
  coverPhoto: 'https://images.unsplash.com/photo-1499744937866-d7e566a20a61?w=900',
  photos: [
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500',
  ],
};

// Replies padrão quando o perfil não define as próprias.
const DEFAULT_REPLIES = [
  'Paz do Senhor! Como vai? 😄',
  'Fico muito feliz de conversar com você!',
  'Vi na sua bio que você também ama a Deus. Que benção! 🙌',
  'Bora marcar um café pra conversar melhor?',
];

const BASE_DECK_PROFILES = [
  {
    id: '1',
    name: 'Camila',
    age: 23,
    gender: 'F',
    distance: 3,
    intent: 'Casamento',
    height: 168,
    children: 'Quer ter',
    bodyType: 'Normal',
    denomination: 'Batista',
    loveLanguage: 'Qualidade de Tempo',
    tags: ['Louvor', 'Praia'],
    bio: 'Apaixonada por Jesus e por praia. Ministério de louvor da minha igreja.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500',
    likesMe: true,
    replies: [
      'Paz do Senhor, Daniel! Que alegria dar match contigo 🙌',
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
    intent: 'Relacionamento sério',
    height: 182,
    children: 'Quer ter',
    bodyType: 'Atlético',
    denomination: 'Assembleia de Deus',
    loveLanguage: 'Atos de Serviço',
    tags: ['Esporte', 'Culinária'],
    bio: 'Engenheiro e líder de célula. Procurando um propósito para dois.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    likesMe: false,
    replies: [
      'Fala, Daniel! Tudo certo por aí?',
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
    intent: 'Casamento',
    height: 162,
    children: 'Quer ter',
    bodyType: 'Em forma',
    denomination: 'Presbiteriana',
    loveLanguage: 'Palavras de Afirmação',
    tags: ['Louvor', 'Música'],
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
    intent: 'Amizade',
    height: 180,
    children: 'Não quer',
    bodyType: 'Atlético',
    denomination: 'Batista',
    loveLanguage: 'Toque Físico',
    tags: ['Esporte', 'Leitura'],
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
    intent: 'Relacionamento sério',
    height: 158,
    children: 'Quer ter',
    bodyType: 'Em forma',
    denomination: 'Metodista',
    loveLanguage: 'Qualidade de Tempo',
    tags: ['Missões', 'Natureza'],
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
    intent: 'Casamento',
    height: 185,
    children: 'Tem filhos',
    bodyType: 'Normal',
    denomination: 'Congregacional',
    loveLanguage: 'Receber Presentes',
    tags: ['Esporte', 'Música'],
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
    intent: 'Amizade',
    height: 166,
    children: 'Não quer',
    bodyType: 'Normal',
    denomination: 'Adventista',
    loveLanguage: 'Palavras de Afirmação',
    tags: ['Louvor', 'Natureza'],
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
    intent: 'Relacionamento sério',
    height: 175,
    children: 'Quer ter',
    bodyType: 'Em forma',
    denomination: 'Batista',
    loveLanguage: 'Atos de Serviço',
    tags: ['Música', 'Missões'],
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
    intent: 'Casamento',
    height: 160,
    children: 'Quer ter',
    bodyType: 'Normal',
    denomination: 'Presbiteriana',
    loveLanguage: 'Qualidade de Tempo',
    tags: ['Leitura', 'Louvor'],
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
    intent: 'Casamento',
    height: 178,
    children: 'Tem filhos',
    bodyType: 'Atlético',
    denomination: 'Assembleia de Deus',
    loveLanguage: 'Receber Presentes',
    tags: ['Esporte', 'Missões'],
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
    intent: 'Relacionamento sério',
    height: 165,
    children: 'Quer ter',
    bodyType: 'Em forma',
    denomination: 'Metodista',
    loveLanguage: 'Toque Físico',
    tags: ['Música', 'Natureza'],
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
    intent: 'Casamento',
    height: 183,
    children: 'Quer ter',
    bodyType: 'Normal',
    denomination: 'Batista',
    loveLanguage: 'Atos de Serviço',
    tags: ['Leitura', 'Culinária'],
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
  showMen: false,
  showWomen: true,
};

// Economia já acumulada pelo usuário no histórico do MVP.
export const SAVINGS_BASE = 50;
// Cada anúncio assistido "economiza" o equivalente a um dia de assinatura premium.
export const SAVINGS_PER_AD = 5;
export const AD_DURATION_SECONDS = 15;

export const FIELD_OPTIONS = {
  churchFrequency: ['Toda semana', '2-3x por mês', '1x por mês', 'Ocasionalmente'],
  maritalStatus: ['Solteiro(a)', 'Divorciado(a)', 'Viúvo(a)'],
  children: ['Não tenho', '1 filho(a)', '2 filhos', '3+ filhos', 'Tenho, não moram comigo'],
  education: ['Ensino Médio', 'Superior incompleto', 'Superior completo', 'Pós-graduação', 'Mestrado/Doutorado'],
  bodyType: ['Atlético', 'Normal', 'Em forma', 'Mais cheinho', 'Sem preferência'],
  ethnicity: ['Branca', 'Parda', 'Negra', 'Asiática', 'Indígena', 'Outra'],
  hairColor: ['Castanho', 'Preto', 'Loiro', 'Ruivo', 'Grisalho', 'Outro'],
  hairType: ['Liso', 'Ondulado', 'Cacheado', 'Crespo', 'Careca'],
  eyeColor: ['Castanho', 'Preto', 'Azul', 'Verde', 'Mel'],
  seekingChildren: ['Sem preferência', 'Não tenha', 'Tenha', 'Tenha, não morem comigo'],
  relationshipType: ['Casamento', 'Relacionamento sério', 'Amizade', 'Sem pressa, conhecendo'],
  loveLanguage: ['Qualidade de Tempo', 'Palavras de Afirmação', 'Receber Presentes', 'Atos de Serviço', 'Toque Físico'],
};

// Limite de fotos extras do perfil (fora a foto principal e a capa).
export const MAX_PROFILE_PHOTOS = 5;

// Filtros estilo "Explore" da tela Principal. `test` recebe o perfil e o contexto
// { user, seeking } e decide se o perfil combina com o card.
// `visible` (opcional) esconde o card quando o usuário não configurou o dado.
export const EXPLORE_FILTERS = [
  { key: 'casamento', icon: '💍', label: 'Casamento',
    test: (p) => p.intent === 'Casamento' },
  { key: 'serio', icon: '❤️', label: 'Relacionamento sério',
    test: (p) => p.intent === 'Relacionamento sério' },
  { key: 'amizade', icon: '🤝', label: 'Amizade cristã',
    test: (p) => p.intent === 'Amizade' },
  { key: 'idade', icon: '🎂', label: 'Idade que busco',
    test: (p, { seeking }) =>
      p.age >= (seeking.minAge || 18) && p.age <= (seeking.maxAge || 99) },
  { key: 'altura', icon: '📏', label: 'Altura que busco',
    test: (p, { seeking }) =>
      p.height >= (seeking.minHeight || 130) && p.height <= (seeking.maxHeight || 220) },
  { key: 'filhos', icon: '👶', label: 'Filhos (sua pref.)',
    test: (p, { seeking }) => {
      const pref = seeking.children;
      if (!pref || pref === 'Sem preferência') return true;
      if (pref === 'Não tenha') return p.children === 'Não quer';
      return p.children === 'Tem filhos';
    } },
  { key: 'denominacao', icon: '⛪', label: 'Mesma denominação',
    visible: ({ user }) => !!user.denomination,
    test: (p, { user }) => p.denomination === user.denomination },
  { key: 'tipofisico', icon: '🏋️', label: 'Tipo físico',
    visible: ({ seeking }) => !!seeking.bodyType && seeking.bodyType !== 'Sem preferência',
    test: (p, { seeking }) => p.bodyType === seeking.bodyType },
  { key: 'louvor', icon: '🎵', label: 'Louvor & música',
    test: (p) => (p.tags || []).includes('Louvor') || (p.tags || []).includes('Música') },
  { key: 'esporte', icon: '⚽', label: 'Fãs de esporte',
    test: (p) => (p.tags || []).includes('Esporte') },
  { key: 'natureza', icon: '🌿', label: 'Paz & Natureza',
    test: (p) => (p.tags || []).includes('Natureza') },
  { key: 'missoes', icon: '🌍', label: 'Visão missionária',
    test: (p) => (p.tags || []).includes('Missões') },
  { key: 'll-tempo', icon: '⏳', label: 'Qualidade de Tempo',
    test: (p) => p.loveLanguage === 'Qualidade de Tempo' },
  { key: 'll-palavras', icon: '💌', label: 'Palavras de Afirmação',
    test: (p) => p.loveLanguage === 'Palavras de Afirmação' },
  { key: 'll-presentes', icon: '🎁', label: 'Receber Presentes',
    test: (p) => p.loveLanguage === 'Receber Presentes' },
  { key: 'll-servico', icon: '🤲', label: 'Atos de Serviço',
    test: (p) => p.loveLanguage === 'Atos de Serviço' },
  { key: 'll-toque', icon: '🫂', label: 'Toque Físico',
    test: (p) => p.loveLanguage === 'Toque Físico' },
];

export function repliesFor(profile) {
  return (profile && profile.replies) || DEFAULT_REPLIES;
}

// ---------------------------------------------------------------------------
// 92 perfis gerados (total: 100 no baralho) — cada um com dados completos e
// respostas de chat únicas combinadas a partir do REPLY_POOL.
// ---------------------------------------------------------------------------

const FEMALE_NAMES = [
  'Ana', 'Bruna', 'Carla', 'Daniela', 'Elisa', 'Flávia', 'Gisele', 'Helena', 'Ingrid',
  'Joyce', 'Karla', 'Larissa', 'Maria', 'Núbia', 'Olímpia', 'Paula', 'Quitéria',
  'Raquel', 'Sofia', 'Talita', 'Úrsula', 'Valéria', 'Wanessa', 'Yasmin', 'Alice',
  'Bianca', 'Célia', 'Débora', 'Esther', 'Fátima', 'Giovana', 'Hadassa', 'Íris',
  'Joana', 'Kelly', 'Lúcia', 'Milena', 'Natália', 'Olívia', 'Priscila', 'Rebeca',
  'Sara', 'Tatiana', 'Viviane', 'Aline',
];
const MALE_NAMES = [
  'André', 'Bruno', 'Caio', 'Danilo', 'Eduardo', 'Fábio', 'Gustavo', 'Henrique',
  'Igor', 'João', 'Kleber', 'Leonardo', 'Marcos', 'Nicolas', 'Otávio', 'Paulo',
  'Rodrigo', 'Samuel', 'Tiago', 'Vitor', 'Wesley', 'Xavier', 'Yuri', 'Adriano',
  'Breno', 'César', 'Davi', 'Elias', 'Felipe', 'Guilherme', 'Hugo', 'Igor',
  'Josué', 'Kaio', 'Leandro', 'Matheus', 'Nathan', 'Osvaldo', 'Pablo', 'Renato',
  'Sérgio', 'Tomás', 'Vinícius', 'Walter', 'Ezequiel', 'Moisés',
];
const PROFESSIONS = [
  'Professora', 'Enfermeira', 'Médica', 'Advogada', 'Fisioterapeuta', 'Contadora',
  'Psicóloga', 'Nutricionista', 'Arquiteta', 'Farmacêutica', 'Engenheiro',
  'Professor', 'Advogado', 'Médico', 'Policia Militar', 'Desenvolvedor',
  'Designer', 'Chef', 'Empresário', 'Missionário em tempo integral',
];
const FAITH_LINES = [
  'Filho de Deus buscando propósito a dois.',
  'Culto de domingo não se negocia.',
  'Oração primeiro, encontro depois.',
  'Sonhando com um lar que glorifica a Deus.',
  'Discipulado e café: minha combinação favorita.',
  'Buscando alguém pra orar junto.',
  'Deus em primeiro lugar, sempre.',
  'A graça me alcançou — agora busco um amor com propósito.',
];
const HOBBY_LINES = [
  'Amo trilha e natureza.', 'Café especial me ganha.',
  'Leio a Bíblia e romances.', 'Violão nas horas vagas.',
  'Corro ao amanhecer.', 'Cozinho pros amigos.',
  'Pinto quadros por hobby.', 'Jogador de futebol de varzea.',
];
const TAG_POOL = ['Louvor', 'Música', 'Esporte', 'Natureza', 'Leitura', 'Missões', 'Culinária', 'Praia'];
const DENOMINATIONS_POOL = [
  'Batista', 'Assembleia de Deus', 'Presbiteriana', 'Metodista', 'Adventista',
  'Congregacional', 'Luterana', 'Pentecostal', 'Católica', 'Reformada',
];
const REPLY_POOL = [
  'Paz do Senhor! Como foi seu dia hoje? 🙏',
  'Que benção esse match! De qual igreja você é?',
  'Acredito que Deus prepara os encontros certos.',
  'Você gosta de conversar sobre a palavra?',
  'Quer conversar? Adoro conhecer histórias de fé.',
  'Qual seu louvor favorito? O meu muda toda semana 🎶',
  'Sou do tipo que ora pelos amigos — vou orar por você também.',
  'Bora conhecer um culto juntos algum dia?',
  'Seu perfil chamou minha atenção. Fé que nos une!',
  'Procuro um relacionamento que honre a Deus. E você?',
  'Confio no tempo de Deus pra tudo — inclusive amizades.',
  'Você já foi em algum retiro de jovens?',
];
const GENERATED_COUNT = 92;

export const GENERATED_PROFILES = Array.from({ length: GENERATED_COUNT }, (_, i) => {
  const female = i % 2 === 0;
  const name = (female ? FEMALE_NAMES : MALE_NAMES)[Math.floor(i / 2) % (female ? FEMALE_NAMES : MALE_NAMES).length];
  const tags = [TAG_POOL[i % TAG_POOL.length], TAG_POOL[(i + 3) % TAG_POOL.length]];
  return {
    id: `g${i + 1}`,
    name,
    age: 19 + ((i * 7) % 24),
    gender: female ? 'F' : 'M',
    distance: 1 + ((i * 13) % 60),
    intent: ['Casamento', 'Relacionamento sério', 'Casamento', 'Relacionamento sério', 'Amizade'][i % 5],
    height: (female ? 150 : 165) + ((i * 5) % 30),
    children: ['Quer ter', 'Não quer', 'Tem filhos', 'Quer ter', 'Sem preferência'][i % 5],
    bodyType: ['Atlético', 'Normal', 'Em forma', 'Normal', 'Mais cheinho'][i % 5],
    denomination: DENOMINATIONS_POOL[i % DENOMINATIONS_POOL.length],
    loveLanguage: FIELD_OPTIONS.loveLanguage[i % FIELD_OPTIONS.loveLanguage.length],
    tags,
    bio: `${PROFESSIONS[i % PROFESSIONS.length]}. ${FAITH_LINES[i % FAITH_LINES.length]} ${HOBBY_LINES[i % HOBBY_LINES.length]}`,
    photo: `https://randomuser.me/api/portraits/${female ? 'women' : 'men'}/${i % 99}.jpg`,
    likesMe: i % 3 === 0,
    replies: [REPLY_POOL[i % REPLY_POOL.length], REPLY_POOL[(i + 4) % REPLY_POOL.length], REPLY_POOL[(i + 7) % REPLY_POOL.length]],
  };
});

export const DECK_PROFILES = [...BASE_DECK_PROFILES, ...GENERATED_PROFILES];
