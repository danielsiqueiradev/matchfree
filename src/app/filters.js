import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { light, radius, spacing } from '../theme';

function Stepper({ label, value, suffix, onChange, min, max, step = 1 }) {
  return (
    <View style={styles.stepper}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepperControls}>
        <Pressable style={styles.stepBtn} onPress={() => onChange(Math.max(min, value - step))}>
          <Text style={styles.stepBtnText}>−</Text>
        </Pressable>
        <Text style={styles.stepperValue}>
          {value}
          {suffix}
        </Text>
        <Pressable style={styles.stepBtn} onPress={() => onChange(Math.min(max, value + step))}>
          <Text style={styles.stepBtnText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function FiltersScreen() {
  const app = useApp();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: spacing(2) }}>
        <Text style={styles.section}>Quero conhecer</Text>
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>👨 Homens</Text>
            <Switch
              value={app.preferences.showMen}
              onValueChange={(showMen) => app.updatePreferences({ showMen })}
              trackColor={{ false: light.border, true: light.accent }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>👩 Mulheres</Text>
            <Switch
              value={app.preferences.showWomen}
              onValueChange={(showWomen) => app.updatePreferences({ showWomen })}
              trackColor={{ false: light.border, true: light.accent }}
              thumbColor="#fff"
            />
          </View>
          {!app.preferences.showMen && !app.preferences.showWomen && (
            <Text style={styles.warn}>Ative pelo menos uma opção para ver perfis na Descoberta.</Text>
          )}
        </View>

        <Text style={styles.section}>Preferências de busca</Text>
        <View style={styles.card}>
          <Stepper
            label="Idade mínima"
            value={app.preferences.minAge}
            suffix=" anos"
            min={18}
            max={app.preferences.maxAge - 1}
            onChange={(minAge) => app.updatePreferences({ minAge })}
          />
          <Stepper
            label="Idade máxima"
            value={app.preferences.maxAge}
            suffix=" anos"
            min={app.preferences.minAge + 1}
            max={80}
            onChange={(maxAge) => app.updatePreferences({ maxAge })}
          />
          <Stepper
            label="Distância máxima"
            value={app.preferences.maxDistance}
            suffix=" km"
            min={1}
            max={200}
            step={5}
            onChange={(maxDistance) => app.updatePreferences({ maxDistance })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: light.bg },
  section: {
    color: light.text,
    fontWeight: '900',
    fontSize: 15,
    marginBottom: spacing(1),
    marginTop: spacing(2),
  },
  card: {
    backgroundColor: light.card,
    borderRadius: radius.md,
    padding: spacing(2),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  switchLabel: { color: light.text, fontWeight: '700', fontSize: 15 },
  warn: { color: light.accent, fontSize: 12, marginTop: 8 },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  stepperLabel: { color: light.text, fontWeight: '700' },
  stepperControls: { flexDirection: 'row', alignItems: 'center', gap: spacing(1.5) },
  stepBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: light.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: { color: light.text, fontSize: 18, fontWeight: '900' },
  stepperValue: { color: light.text, fontWeight: '800', minWidth: 70, textAlign: 'center' },
});
