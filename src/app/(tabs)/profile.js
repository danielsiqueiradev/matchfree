import { router } from 'expo-router';
import { Platform, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../store/AppContext';
import { light, radius, spacing } from '../../theme';

const MENU_ITEMS = [
  { key: 'settings', icon: '⚙️', label: 'Configurações', route: '/edit-profile' },
  { key: 'premium', icon: '🏅', label: 'Benefícios Premium', route: '/menu/premium' },
  { key: 'share', icon: '🔗', label: 'Compartilhar o Aplicativo', route: '/menu/share' },
  { key: 'support', icon: '💬', label: 'Fale Conosco / Suporte', route: '/menu/support' },
  { key: 'credits', icon: '💵', label: 'Créditos', route: '/menu/credits' },
  { key: 'plan', icon: '💳', label: 'Meu Plano', route: '/menu/plan' },
  { key: 'help', icon: '❓', label: 'Como utilizar o Aplicativo', route: '/menu/help' },
  { key: 'terms', icon: '📄', label: 'Termos e Condições', route: '/menu/terms' },
  { key: 'privacy', icon: '📃', label: 'Política de Privacidade', route: '/menu/privacy' },
];

function GenderSwitch({ showMen, showWomen, onSelect }) {
  const options = [
    { key: 'M', label: 'Homens', icon: '👨' },
    { key: 'F', label: 'Mulheres', icon: '👩' },
  ];
  const selected = showMen ? 'M' : 'F';
  return (
    <View style={styles.segmented}>
      {options.map((opt) => (
        <Pressable
          key={opt.key}
          style={[styles.segment, selected === opt.key && styles.segmentActive]}
          onPress={() => onSelect(opt.key)}
        >
          <Text style={[styles.segmentText, selected === opt.key && styles.segmentTextActive]}>
            {opt.icon} {opt.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function OptionsScreen() {
  const app = useApp();

  const toggleGps = (enabled) => {
    if (!enabled) {
      app.disableGps();
      return;
    }
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          app.enableGps(
            { lat: pos.coords.latitude, lon: pos.coords.longitude },
            'GPS verificado'
          ),
        () => app.enableGps(null, 'GPS simulado (permissão negada)'),
        { timeout: 4000 }
      );
      // se o navegador não responder, garante a ativação simulada
      setTimeout(() => {
        if (!app.gpsEnabled) app.enableGps(null, 'GPS simulado');
      }, 4500);
      return;
    }
    app.enableGps(null, 'GPS simulado');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>Quero conhecer</Text>
        <View style={[styles.card, styles.segmentedCard]}>
          <GenderSwitch
            showMen={app.preferences.showMen}
            showWomen={app.preferences.showWomen}
            onSelect={(g) =>
              app.updatePreferences({ showMen: g === 'M', showWomen: g === 'F' })
            }
          />
        </View>

        <View style={[styles.card, styles.gpsCard]}>
          <View style={styles.gpsRow}>
            <Text style={styles.gpsLabel}>📍 Apenas pessoas próximas</Text>
            <Switch
              value={app.gpsEnabled}
              onValueChange={toggleGps}
              trackColor={{ false: light.border, true: light.accent }}
              thumbColor="#fff"
            />
          </View>
          {app.gpsEnabled && (
            <>
              <Text style={styles.gpsStatus}>✅ {app.gpsLabel}</Text>
              <View style={styles.gpsRow}>
                <Text style={styles.gpsLabel}>Distância máxima</Text>
                <View style={styles.stepperControls}>
                  <Pressable
                    style={styles.stepBtn}
                    onPress={() =>
                      app.updatePreferences({
                        maxDistance: Math.max(1, app.preferences.maxDistance - 5),
                      })
                    }
                  >
                    <Text style={styles.stepBtnText}>−</Text>
                  </Pressable>
                  <Text style={styles.stepperValue}>{app.preferences.maxDistance} km</Text>
                  <Pressable
                    style={styles.stepBtn}
                    onPress={() =>
                      app.updatePreferences({
                        maxDistance: Math.min(200, app.preferences.maxDistance + 5),
                      })
                    }
                  >
                    <Text style={styles.stepBtnText}>+</Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
          {!app.gpsEnabled && (
            <Text style={styles.gpsHint}>
              Ative para ver só quem está perto de você (usa o GPS do aparelho).
            </Text>
          )}
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

        <Pressable style={styles.logoutBtn} onPress={app.logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: light.bg },
  content: { padding: spacing(2), paddingTop: 0 },
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
  sectionLabel: {
    color: light.text,
    fontWeight: '900',
    fontSize: 14,
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  segmentedCard: { padding: 6 },
  segmented: { flexDirection: 'row', backgroundColor: light.bg, borderRadius: radius.lg },
  segment: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: radius.lg },
  segmentActive: { backgroundColor: light.accent },
  segmentText: { color: light.textMuted, fontWeight: '800', fontSize: 14 },
  segmentTextActive: { color: '#fff' },
  logoutBtn: { alignItems: 'center', marginTop: spacing(2.5), paddingBottom: spacing(3) },
  logoutText: {
    color: light.textMuted,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  gpsCard: { padding: spacing(2), marginTop: spacing(2) },
  gpsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  gpsLabel: { color: light.text, fontWeight: '700', fontSize: 14 },
  gpsStatus: { color: '#2E9E5B', fontSize: 12, marginBottom: 2 },
  gpsHint: { color: light.textMuted, fontSize: 12, marginTop: 4 },
  stepperControls: { flexDirection: 'row', alignItems: 'center', gap: spacing(1.5) },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: light.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: { color: light.text, fontSize: 16, fontWeight: '900' },
  stepperValue: { color: light.text, fontWeight: '800', minWidth: 58, textAlign: 'center' },
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
