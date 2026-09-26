import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { AD_DURATION_SECONDS } from '../data/mock';
import { useApp } from '../store/AppContext';
import { colors, radius, spacing } from '../theme';

const RewardedAdContext = createContext(null);

const FAKE_ADS = [
  { brand: 'TurboCar 3D', tagline: 'Corra sem limites. Baixe grátis!', emoji: '🏎️', bg: '#2B1A4A' },
  { brand: 'Delivery Já', tagline: 'Seu jantar em 20 minutos.', emoji: '🍔', bg: '#4A2A1A' },
  { brand: 'FitLife', tagline: '30 dias de treino em casa.', emoji: '🏋️', bg: '#12303A' },
];

export function RewardedAdProvider({ children }) {
  const { registerAdWatched } = useApp();
  const [request, setRequest] = useState(null); // { title, reward, resolve }
  const [secondsLeft, setSecondsLeft] = useState(AD_DURATION_SECONDS);
  const [ad, setAd] = useState(FAKE_ADS[0]);
  const resolverRef = useRef(null);

  const showRewardedAd = useCallback(({ title, reward }) => {
    setAd(FAKE_ADS[Math.floor(Math.random() * FAKE_ADS.length)]);
    setSecondsLeft(AD_DURATION_SECONDS);
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setRequest({ title, reward });
    });
  }, []);

  useEffect(() => {
    if (!request || secondsLeft <= 0) return undefined;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [request, secondsLeft]);

  const finish = (completed) => {
    const resolve = resolverRef.current;
    resolverRef.current = null;
    setRequest(null);
    if (completed) registerAdWatched();
    if (resolve) resolve(completed);
  };

  const done = secondsLeft <= 0;
  const progress = ((AD_DURATION_SECONDS - secondsLeft) / AD_DURATION_SECONDS) * 100;

  return (
    <RewardedAdContext.Provider value={{ showRewardedAd }}>
      {children}
      <Modal visible={!!request} animationType="fade" transparent onRequestClose={() => finish(false)}>
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <Text style={styles.sponsor}>ANÚNCIO RECOMPENSADO · SIMULADO</Text>
            <Text style={styles.title}>{request?.title}</Text>

            <View style={[styles.creative, { backgroundColor: ad.bg }]}>
              <Text style={styles.creativeEmoji}>{ad.emoji}</Text>
              <Text style={styles.creativeBrand}>{ad.brand}</Text>
              <Text style={styles.creativeTagline}>{ad.tagline}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Ad</Text>
              </View>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            <Text style={styles.counter} accessibilityRole="text">
              {done ? 'Recompensa liberada! 🎉' : `Aguarde ${secondsLeft}s para liberar...`}
            </Text>
            <Text style={styles.reward}>Recompensa: {request?.reward}</Text>

            <Pressable
              style={[styles.cta, !done && styles.ctaDisabled]}
              disabled={!done}
              onPress={() => finish(true)}
            >
              <Text style={styles.ctaText}>{done ? 'RESGATAR RECOMPENSA' : `${secondsLeft}s`}</Text>
            </Pressable>

            <Pressable onPress={() => finish(false)} hitSlop={10}>
              <Text style={styles.skip}>{done ? 'Fechar' : 'Pular (sem recompensa)'}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </RewardedAdContext.Provider>
  );
}

export function useRewardedAd() {
  const ctx = useContext(RewardedAdContext);
  if (!ctx) throw new Error('useRewardedAd deve ser usado dentro de <RewardedAdProvider>');
  return ctx;
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing(2),
  },
  sheet: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing(2.5),
    borderWidth: 1,
    borderColor: colors.border,
  },
  sponsor: { color: colors.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  title: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 6 },
  creative: {
    height: 200,
    borderRadius: radius.md,
    marginTop: spacing(2),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  creativeEmoji: { fontSize: 64 },
  creativeBrand: { color: '#fff', fontSize: 22, fontWeight: '900', marginTop: 8 },
  creativeTagline: { color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFD166',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: { fontSize: 11, fontWeight: '900', color: '#000' },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.cardAlt,
    marginTop: spacing(2),
    overflow: 'hidden',
  },
  progressFill: { height: 6, backgroundColor: colors.green },
  counter: { color: colors.text, marginTop: spacing(1.5), fontWeight: '700', textAlign: 'center' },
  reward: { color: colors.textMuted, marginTop: 4, textAlign: 'center', fontSize: 13 },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing(2),
  },
  ctaDisabled: { backgroundColor: colors.cardAlt },
  ctaText: { color: colors.text, fontWeight: '900', letterSpacing: 0.5 },
  skip: { color: colors.textMuted, textAlign: 'center', marginTop: spacing(1.5), fontSize: 13 },
});
