import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MatchModal from '../../components/MatchModal';
import { useRewardedAd } from '../../components/RewardedAdProvider';
import SwipeDeck from '../../components/SwipeDeck';
import { useApp } from '../../store/AppContext';
import { colors, radius, spacing } from '../../theme';

export default function DiscoverScreen() {
  const app = useApp();
  const { showRewardedAd } = useRewardedAd();
  const deckRef = useRef(null);
  const [matched, setMatched] = useState(null);

  const handleSwipe = (profile, direction) => {
    app.swipe(profile, direction);
    if (direction === 'right' && profile.likesMe) setMatched(profile);
  };

  const handleRewind = async () => {
    if (!app.canRewind) return;
    const ok = await showRewardedAd({
      title: 'Desfazer o último swipe (Rewind)',
      reward: '1x Rewind grátis',
    });
    if (ok) app.rewind();
  };

  const handleBoost = async () => {
    const ok = await showRewardedAd({
      title: 'Destacar seu perfil (Boost)',
      reward: '30 minutos de destaque na região',
    });
    if (ok) app.boost();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>
            Match<Text style={{ color: colors.text }}>Free</Text>
          </Text>
          <Text style={styles.tagline}>100% grátis · pago com anúncios</Text>
        </View>
        <View style={styles.counters}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>🪙 {app.adCoins}</Text>
          </View>
          <View style={[styles.pill, app.boostRank ? styles.pillActive : null]}>
            <Text style={styles.pillText}>
              ⭐ {app.boostRank ? `Top ${app.boostRank}%` : 'Sem boost'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.deckArea}>
        <SwipeDeck
          ref={deckRef}
          profiles={app.deck}
          cursor={app.cursor}
          onSwipe={handleSwipe}
        />
      </View>

      <Text style={styles.hint}>
        Arraste o card para os lados ou use os botões · {app.remaining} perfis restantes
      </Text>

      <View style={styles.actions}>
        <Pressable
          style={[styles.btn, styles.btnSmall, !app.canRewind && styles.btnDisabled]}
          onPress={handleRewind}
          disabled={!app.canRewind}
          accessibilityLabel="Rewind"
        >
          <Text style={styles.btnEmoji}>↩️</Text>
          <Text style={styles.btnLabel}>REWIND</Text>
        </Pressable>

        <Pressable
          style={[styles.btn, styles.btnBig]}
          onPress={() => deckRef.current?.swipeLeft()}
          accessibilityLabel="Passar"
        >
          <Text style={styles.btnEmojiBig}>❌</Text>
          <Text style={styles.btnLabel}>PASSAR</Text>
        </Pressable>

        <Pressable style={[styles.btn, styles.btnSmall]} onPress={handleBoost} accessibilityLabel="Boost">
          <Text style={styles.btnEmoji}>⭐</Text>
          <Text style={styles.btnLabel}>BOOST</Text>
        </Pressable>

        <Pressable
          style={[styles.btn, styles.btnBig]}
          onPress={() => deckRef.current?.swipeRight()}
          accessibilityLabel="Curtir"
        >
          <Text style={styles.btnEmojiBig}>💚</Text>
          <Text style={styles.btnLabel}>CURTIR</Text>
        </Pressable>
      </View>

      <MatchModal
        visible={!!matched}
        user={app.user}
        profile={matched}
        onKeepSwiping={() => setMatched(null)}
        onMessage={() => {
          const id = matched.id;
          setMatched(null);
          router.push(`/chat/${id}`);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1.5),
  },
  logo: { color: colors.primary, fontSize: 26, fontWeight: '900' },
  tagline: { color: colors.textMuted, fontSize: 11 },
  counters: { flexDirection: 'row', gap: 8 },
  pill: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillActive: { borderColor: colors.accent },
  pillText: { color: colors.text, fontWeight: '800', fontSize: 12 },
  deckArea: { flex: 1, paddingHorizontal: spacing(2), paddingBottom: spacing(1) },
  hint: { color: colors.textMuted, textAlign: 'center', fontSize: 12, marginBottom: spacing(1) },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing(1.5),
    paddingBottom: spacing(2),
    paddingHorizontal: spacing(2),
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 40,
  },
  btnSmall: { width: 66, height: 66 },
  btnBig: { width: 78, height: 78 },
  btnDisabled: { opacity: 0.35 },
  btnEmoji: { fontSize: 20 },
  btnEmojiBig: { fontSize: 26 },
  btnLabel: { color: colors.textMuted, fontSize: 9, fontWeight: '900', marginTop: 2 },
});
