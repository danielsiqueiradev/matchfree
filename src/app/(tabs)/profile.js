import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../store/AppContext';
import { light, radius, spacing } from '../../theme';

const MENU_ITEMS = [
  { key: 'settings', icon: '⚙️', label: 'Configurações', route: '/edit-profile' },
  { key: 'filters', icon: '🔻', label: 'Filtrar Perfis', route: '/filters' },
  { key: 'premium', icon: '🏅', label: 'Benefícios Premium', route: '/menu/premium' },
  { key: 'share', icon: '🔗', label: 'Compartilhar o Aplicativo', route: '/menu/share' },
  { key: 'support', icon: '💬', label: 'Fale Conosco / Suporte', route: '/menu/support' },
  { key: 'credits', icon: '💵', label: 'Créditos', route: '/menu/credits' },
  { key: 'plan', icon: '💳', label: 'Meu Plano', route: '/menu/plan' },
  { key: 'help', icon: '❓', label: 'Como utilizar o Aplicativo', route: '/menu/help' },
  { key: 'terms', icon: '📄', label: 'Termos e Condições', route: '/menu/terms' },
  { key: 'privacy', icon: '📃', label: 'Política de Privacidade', route: '/menu/privacy' },
];

function Stat({ label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export default function OptionsScreen() {
  const app = useApp();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileWrap}>
          <View style={[styles.card, styles.profileCard]}>
            {!!app.user.coverPhoto && (
              <Image source={{ uri: app.user.coverPhoto }} style={styles.cover} />
            )}
            <View style={{ height: 60 }} />
            <Text style={styles.name}>
              {app.user.name}, {app.user.age}
            </Text>
            <Text style={styles.location}>📍 {app.user.location}</Text>

            <View style={styles.divider} />
            <View style={styles.statsRow}>
              <Stat label="Curti" value={app.stats.curti} />
              <Stat label="Me Curtiram" value={app.stats.meCurtiram} />
              <Stat label="Matches" value={app.stats.matches} />
            </View>
            <View style={styles.divider} />
            <Pressable onPress={() => router.push('/menu/credits')}>
              <Text style={styles.moreStats}>Ver Mais Estatísticas</Text>
            </Pressable>

            {(app.user.photos || []).length > 0 && (
              <>
                <View style={styles.divider} />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.galleryRow}
                >
                  {app.user.photos.map((uri, index) => (
                    <Image key={`${uri}-${index}`} source={{ uri }} style={styles.galleryThumb} />
                  ))}
                </ScrollView>
              </>
            )}
          </View>

          <View style={styles.avatarWrap}>
            <Image source={{ uri: app.user.photo }} style={styles.avatar} />
            <Pressable style={styles.editBadge} onPress={() => router.push('/edit-profile')}>
              <Text style={styles.editBadgeText}>✏️</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.card, { padding: 0, marginTop: spacing(2) }]}>
          {MENU_ITEMS.map((item, index) => (
            <Pressable
              key={item.key}
              style={[styles.menuItem, index < MENU_ITEMS.length - 1 && styles.menuItemBorder]}
              onPress={() => router.push(item.route)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: light.bg },
  content: { padding: spacing(2), paddingTop: 0 },
  profileWrap: { marginTop: 70 },
  card: {
    backgroundColor: light.card,
    borderRadius: radius.md,
    paddingVertical: spacing(1.5),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cover: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: radius.md,
    borderTopRightRadius: radius.md,
  },
  galleryRow: { paddingHorizontal: spacing(2), paddingBottom: spacing(1), gap: spacing(1) },
  galleryThumb: { width: 62, height: 62, borderRadius: radius.sm },
  profileCard: { paddingVertical: 0, overflow: 'hidden', paddingBottom: spacing(1.5) },
  avatarWrap: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: light.card,
  },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: '34%',
    backgroundColor: light.card,
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  editBadgeText: { fontSize: 13 },
  name: { color: light.text, fontSize: 22, fontWeight: '900', textAlign: 'center' },
  location: { color: light.textMuted, textAlign: 'center', marginTop: 2, fontSize: 13 },
  divider: { height: 1, backgroundColor: light.border, marginVertical: spacing(1.5) },
  statsRow: { flexDirection: 'row' },
  stat: { flex: 1, alignItems: 'center' },
  statLabel: { color: light.textMuted, fontSize: 13 },
  statValue: { color: light.accent, fontSize: 22, fontWeight: '900', marginTop: 2 },
  moreStats: {
    color: light.accent,
    textAlign: 'center',
    fontWeight: '700',
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: spacing(2),
    gap: spacing(1.5),
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: light.border },
  menuIcon: { fontSize: 18, width: 26, textAlign: 'center' },
  menuLabel: { flex: 1, color: light.text, fontSize: 15, fontWeight: '600' },
  chevron: { color: light.textMuted, fontSize: 22 },
});
