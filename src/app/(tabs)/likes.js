import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MatchModal from '../../components/MatchModal';
import { useRewardedAd } from '../../components/RewardedAdProvider';
import { useApp } from '../../store/AppContext';
import { colors, radius, spacing } from '../../theme';

export default function LikesScreen() {
  const app = useApp();
  const { showRewardedAd } = useRewardedAd();
  const [matched, setMatched] = useState(null);
  const locked = !app.admirersUnlocked;

  const handleUnlock = async () => {
    const ok = await showRewardedAd({
      title: 'Ver quem te curtiu',
      reward: `Revelar ${app.admirers.length} perfis que te curtiram`,
    });
    if (ok) app.unlockAdmirers();
  };

  const handleLike = (profile) => {
    app.likeAdmirer(profile);
    setMatched(profile);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Quem te curtiu</Text>
        <Text style={styles.subtitle}>
          De graça, sempre. Aqui você paga com 15 segundos de atenção — não com dinheiro.
        </Text>
      </View>

      {locked && app.admirers.length > 0 && (
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            {app.admirers.length} pessoas te curtiram! 🔥
          </Text>
          <Text style={styles.bannerText}>
            Assista a um vídeo curto de 15s para ver quem é, de graça.
          </Text>
          <Pressable style={styles.cta} onPress={handleUnlock}>
            <Text style={styles.ctaText}>DESBLOQUEAR VER QUEM CURTIU 🔥</Text>
          </Pressable>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.grid}>
        {app.admirers.length === 0 && (
          <Text style={styles.empty}>Nenhuma curtida nova por enquanto. Volte mais tarde!</Text>
        )}
        {app.admirers.map((profile) => (
          <View key={profile.id} style={styles.cell}>
            <Image
              source={{ uri: profile.photo }}
              style={styles.photo}
              blurRadius={locked ? 28 : 0}
            />
            {locked && (
              <BlurView intensity={70} tint="dark" style={StyleSheet.absoluteFill}>
                <View style={styles.lockOverlay}>
                  <Text style={styles.lockEmoji}>🔒</Text>
                  <Text style={styles.lockText}>Bloqueado</Text>
                </View>
              </BlurView>
            )}
            <View style={styles.cellInfo}>
              <Text style={styles.cellName}>
                {locked ? '••••••, ••' : `${profile.name}, ${profile.age}`}
              </Text>
              {!locked && <Text style={styles.cellBio} numberOfLines={2}>{profile.bio}</Text>}
            </View>
            {!locked && (
              <Pressable style={styles.likeBtn} onPress={() => handleLike(profile)}>
                <Text style={styles.likeBtnText}>💚 CURTIR DE VOLTA</Text>
              </Pressable>
            )}
          </View>
        ))}
      </ScrollView>

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
  header: { paddingHorizontal: spacing(2), paddingTop: spacing(1) },
  title: { color: colors.text, fontSize: 26, fontWeight: '900' },
  subtitle: { color: colors.textMuted, marginTop: 4, fontSize: 13 },
  banner: {
    margin: spacing(2),
    padding: spacing(2),
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  bannerTitle: { color: colors.text, fontWeight: '900', fontSize: 16 },
  bannerText: { color: colors.textMuted, marginTop: 4, fontSize: 13 },
  cta: {
    marginTop: spacing(1.5),
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: { color: '#fff', fontWeight: '900', fontSize: 13 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing(1.5),
    padding: spacing(2),
    justifyContent: 'center',
  },
  cell: {
    width: 170,
    height: 250,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  photo: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  lockOverlay: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  lockEmoji: { fontSize: 34 },
  lockText: { color: '#fff', fontWeight: '800', marginTop: 6 },
  cellInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing(1),
    backgroundColor: 'rgba(10,8,16,0.72)',
  },
  cellName: { color: '#fff', fontWeight: '800' },
  cellBio: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 2 },
  likeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  likeBtnText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: spacing(4) },
});
