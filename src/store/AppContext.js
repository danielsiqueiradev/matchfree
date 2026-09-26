import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import {
  CURRENT_USER,
  DECK_PROFILES,
  DEFAULT_PREFERENCES,
  SAVINGS_BASE,
  SAVINGS_PER_AD,
  SECRET_ADMIRERS,
} from '../data/mock';

const STORAGE_KEY = '@matchfree/state/v1';

const initialState = {
  hydrated: false,
  user: CURRENT_USER,
  preferences: DEFAULT_PREFERENCES,
  deck: DECK_PROFILES,
  admirers: SECRET_ADMIRERS,
  cursor: 0, // índice do card visível no baralho
  history: [], // [{ cursor, profileId, action }]
  matches: [], // [{ id, profile, createdAt }]
  messages: {}, // { [matchId]: [{ id, text, author, createdAt }] }
  admirersUnlocked: false,
  adCoins: 0,
  adsWatched: 0,
  boostRank: null, // posição no ranking de destaque
  boostExpiresAt: null,
};

const AUTO_REPLIES = [
  'Oii! Tudo bem? 😄',
  'Adorei teu perfil, sério!',
  'Bora marcar alguma coisa esse fim de semana?',
  'Kkkk boa! Conta mais.',
  'Também curto isso demais 🔥',
];

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload, hydrated: true };

    case 'SWIPE': {
      const { profile, direction } = action;
      const history = [
        ...state.history,
        { cursor: state.cursor, profileId: profile.id, action: direction },
      ];
      const next = { ...state, cursor: state.cursor + 1, history };
      if (direction === 'right' && profile.likesMe) {
        return { ...next, ...addMatch(state, profile) };
      }
      return next;
    }

    case 'LIKE_ADMIRER': {
      const profile = action.profile;
      if (state.matches.some((m) => m.profile.id === profile.id)) return state;
      return {
        ...state,
        ...addMatch(state, profile),
        admirers: state.admirers.filter((p) => p.id !== profile.id),
      };
    }

    case 'REWIND': {
      if (state.history.length === 0) return state;
      const last = state.history[state.history.length - 1];
      const matches = state.matches.filter((m) => m.profile.id !== last.profileId);
      const messages = { ...state.messages };
      delete messages[last.profileId];
      return {
        ...state,
        cursor: last.cursor,
        history: state.history.slice(0, -1),
        matches,
        messages,
      };
    }

    case 'UNLOCK_ADMIRERS':
      return { ...state, admirersUnlocked: true };

    case 'BOOST':
      return {
        ...state,
        boostRank: Math.floor(Math.random() * 5) + 1,
        boostExpiresAt: Date.now() + 30 * 60 * 1000,
      };

    case 'AD_WATCHED':
      return { ...state, adsWatched: state.adsWatched + 1, adCoins: state.adCoins + 1 };

    case 'SPEND_COIN':
      return { ...state, adCoins: Math.max(0, state.adCoins - 1) };

    case 'SEND_MESSAGE': {
      const { matchId, text, author } = action;
      const list = state.messages[matchId] || [];
      return {
        ...state,
        messages: {
          ...state.messages,
          [matchId]: [
            ...list,
            { id: `${Date.now()}-${author}`, text, author, createdAt: Date.now() },
          ],
        },
      };
    }

    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };

    case 'UPDATE_PREFERENCES':
      return { ...state, preferences: { ...state.preferences, ...action.payload } };

    case 'RESET':
      return { ...initialState, hydrated: true };

    default:
      return state;
  }
}

function addMatch(state, profile) {
  if (state.matches.some((m) => m.profile.id === profile.id)) return {};
  const match = { id: profile.id, profile, createdAt: Date.now() };
  return {
    matches: [match, ...state.matches],
    messages: {
      ...state.messages,
      [profile.id]: [
        {
          id: `${Date.now()}-them`,
          text: `Oi ${state.user.name}! Curti muito o seu perfil 😊`,
          author: 'them',
          createdAt: Date.now(),
        },
      ],
    },
  };
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!active) return;
        dispatch({ type: 'HYDRATE', payload: raw ? JSON.parse(raw) : {} });
      })
      .catch(() => dispatch({ type: 'HYDRATE', payload: {} }));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    const { hydrated, ...persisted } = state;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persisted)).catch(() => {});
  }, [state]);

  const sendMessage = useCallback((matchId, text) => {
    dispatch({ type: 'SEND_MESSAGE', matchId, text, author: 'me' });
    const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
    setTimeout(() => {
      dispatch({ type: 'SEND_MESSAGE', matchId, text: reply, author: 'them' });
    }, 1200);
  }, []);

  const value = useMemo(() => {
    const currentProfile = state.deck[state.cursor] || null;
    return {
      ...state,
      currentProfile,
      remaining: Math.max(0, state.deck.length - state.cursor),
      savings: SAVINGS_BASE + state.adsWatched * SAVINGS_PER_AD,
      canRewind: state.history.length > 0,
      swipe: (profile, direction) => dispatch({ type: 'SWIPE', profile, direction }),
      rewind: () => dispatch({ type: 'REWIND' }),
      unlockAdmirers: () => dispatch({ type: 'UNLOCK_ADMIRERS' }),
      likeAdmirer: (profile) => dispatch({ type: 'LIKE_ADMIRER', profile }),
      boost: () => dispatch({ type: 'BOOST' }),
      registerAdWatched: () => dispatch({ type: 'AD_WATCHED' }),
      spendCoin: () => dispatch({ type: 'SPEND_COIN' }),
      sendMessage,
      updateUser: (payload) => dispatch({ type: 'UPDATE_USER', payload }),
      updatePreferences: (payload) => dispatch({ type: 'UPDATE_PREFERENCES', payload }),
      reset: () => dispatch({ type: 'RESET' }),
    };
  }, [state, sendMessage]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de <AppProvider>');
  return ctx;
}
