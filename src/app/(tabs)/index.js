import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MatchModal from '../../components/MatchModal';
import { useRewardedAd } from '../../components/RewardedAdProvider';
import SwipeDeck from '../../components/SwipeDeck';
import { EXPLORE_FILTERS } from '../../data/mock';
import { useApp } from '../../store/AppContext';
import { colors, radius, spacing } from '../../theme';

function ExploreTile({ filter, count, active, onToggle }) {
  return (
    <Pressable
      style={[styles.tile, !active && styles.tileInactive, active && styles.tileActive]}
      onPress={onToggle}
      accessibilityLabel={filter.label}
      accessibilityState={{ selected: active }}
    >
      <Text style={styles.tileIcon}>{filter.icon}</Text>
      <Text style={styles.tileLabel}>{filter.label}</Text>
      <Text style={styles.tileCount}>{count} {count === 1 ? 'pessoa' : 'pessoas'}</Text>
    </Pressable>
  );
}

export default function DiscoverScreen() {
  const app = useApp();
  const { showRewardedAd } = useRewardedAd();
  const deckRef = useRef(null);
  const [matched, setMatched] = useState(null);
  const [photoHintDismissed, setPhotoHintDismissed] = useState(false);

  const ctx = { user: app.user, seeking: app.user.seeking || {} };
  const tiles = EXPLORE_FILTERS.filter((f) => !f.visible || f.visible(ctx));

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
          <Text style={styles.tagline}>100% grátis · amor com propósito 🙏</Text>
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
          {app.gpsEnabled && (
            <View style={[styles.pill, styles.pillActive]}>
              <Text style={styles.pillText}>📍 {app.preferences.maxDistance} km</Text>
            </View>
          )}
        </View>
      </View>

      <View>
        <Text style={styles.exploreTitle}>
          Conheça pessoas que têm a mesma intenção que você
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.exploreRow}
        >
          {tiles.map((f) => (
            <ExploreTile
              key={f.key}
              filter={f}
              count={app.deckPool.filter((p) => f.test(p, ctx)).length}
              active={app.exploreFilter === f.key}
              onToggle={() =>
                app.setExploreFilter(app.exploreFilter === f.key ? null : f.key)
              }
            />
          ))}
        </ScrollView>
      </View>

      {!(app.user.photos || []).length && !photoHintDismissed && (
        <View style={styles.photoHint}>
          <Text style={styles.photoHintText}>
            📸 Perfis com fotos têm muito mais chances de match! Adicione fotos ao seu perfil.
          </Text>
          <Pressable onPress={() => router.push('/edit-profile')} style={styles.photoHintBtn}>
            <Text style={styles.photoHintBtnText}>Adicionar</Text>
          </Pressable>
          <Pressable onPress={() => setPhotoHintDismissed(true)} hitSlop={8}>
            <Text style={styles.photoHintClose}>✕</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.deckArea}>
        <SwipeDeck
          ref={deckRef}
          profiles={app.deck}
          cursor={0}
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
  photoHint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radius.md,
    marginHorizontal: spacing(2),
    paddingVertical: 10,
    paddingHorizontal: spacing(1.5),
    gap: spacing(1),
  },
  photoHintText: { color: colors.text, fontSize: 12, flex: 1 },
  photoHintBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  photoHintBtnText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  photoHintClose: { color: colors.textMuted, fontSize: 14, padding: 4 },
  exploreTitle: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    marginHorizontal: spacing(2),
    marginBottom: 6,
  },
  exploreRow: { paddingHorizontal: spacing(2), gap: 8, paddingBottom: spacing(1) },
  tile: {
    width: 118,
    height: 150,
    borderRadius: radius.md,
    backgroundColor: colors.cardAlt,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: spacing(1.5),
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  tileInactive: { opacity: 0.55 },
  tileActive: { borderColor: colors.accent },
  tileIcon: { position: 'absolute', top: spacing(1.5), left: spacing(1.5), fontSize: 24 },
  tileLabel: { color: colors.text, fontWeight: '800', fontSize: 13 },
  tileCount: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
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
