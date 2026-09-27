import { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRewardedAd } from '../../components/RewardedAdProvider';
import { useApp } from '../../store/AppContext';
import { colors, radius, spacing } from '../../theme';

function Stepper({ label, value, suffix, onChange, min, max, step = 1 }) {
  return (
    <View style={styles.stepper}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepperControls}>
        <Pressable
          style={styles.stepBtn}
          onPress={() => onChange(Math.max(min, value - step))}
          accessibilityLabel={`Diminuir ${label}`}
        >
          <Text style={styles.stepBtnText}>−</Text>
        </Pressable>
        <Text style={styles.stepperValue}>
          {value}
          {suffix}
        </Text>
        <Pressable
          style={styles.stepBtn}
          onPress={() => onChange(Math.min(max, value + step))}
          accessibilityLabel={`Aumentar ${label}`}
        >
          <Text style={styles.stepBtnText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const app = useApp();
  const { showRewardedAd } = useRewardedAd();
  const [photo, setPhoto] = useState(app.user.photo);

  const handleBoost = async () => {
    const ok = await showRewardedAd({
      title: 'Destacar seu perfil (Boost)',
      reward: '30 minutos de destaque na região',
    });
    if (ok) app.boost();
  };

  const confirmReset = () => {
    const question = 'Reiniciar MVP? Isso apaga matches, mensagens e desbloqueios locais.';
    if (Platform.OS === 'web') {
      if (window.confirm(question)) app.reset();
      return;
    }
    Alert.alert('Reiniciar MVP', 'Isso apaga matches, mensagens e desbloqueios locais.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Reiniciar', style: 'destructive', onPress: app.reset },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: spacing(2), paddingBottom: spacing(5) }}>
        <View style={styles.card}>
          <Image source={{ uri: app.user.photo }} style={styles.avatar} />
          <Text style={styles.name}>
            {app.user.name}, {app.user.age}
          </Text>
          <Text style={styles.bio}>{app.user.bio}</Text>
        </View>

        <Text style={styles.section}>Editar perfil</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={app.user.name}
            onChangeText={(name) => app.updateUser({ name })}
            placeholderTextColor={colors.textMuted}
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            value={app.user.bio}
            multiline
            onChangeText={(bio) => app.updateUser({ bio })}
            placeholderTextColor={colors.textMuted}
          />

          <Text style={styles.label}>URL da foto</Text>
          <View style={{ flexDirection: 'row', gap: spacing(1) }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={photo}
              onChangeText={setPhoto}
              autoCapitalize="none"
              placeholderTextColor={colors.textMuted}
            />
            <Pressable style={styles.smallBtn} onPress={() => app.updateUser({ photo })}>
              <Text style={styles.smallBtnText}>Salvar</Text>
            </Pressable>
          </View>

          <Stepper
            label="Idade"
            value={app.user.age}
            suffix=" anos"
            min={18}
            max={80}
            onChange={(age) => app.updateUser({ age })}
          />
        </View>

        <Text style={styles.section}>Quero conhecer</Text>
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>👨 Homens</Text>
            <Switch
              value={app.preferences.showMen}
              onValueChange={(showMen) => app.updatePreferences({ showMen })}
              trackColor={{ false: colors.cardAlt, true: colors.primary }}
              thumbColor="#fff"
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>👩 Mulheres</Text>
            <Switch
              value={app.preferences.showWomen}
              onValueChange={(showWomen) => app.updatePreferences({ showWomen })}
              trackColor={{ false: colors.cardAlt, true: colors.primary }}
              thumbColor="#fff"
            />
          </View>
          {!app.preferences.showMen && !app.preferences.showWomen && (
            <Text style={styles.switchWarn}>
              Ative pelo menos uma opção para ver perfis na Descoberta.
            </Text>
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

        <Text style={styles.section}>Sua economia</Text>
        <View style={[styles.card, styles.savingsCard]}>
          <Text style={styles.savings}>
            Você já economizou R$ {app.savings.toFixed(2).replace('.', ',')} em assinaturas
            assistindo anúncios!
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{app.adsWatched}</Text>
              <Text style={styles.statLabel}>anúncios vistos</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{app.adCoins}</Text>
              <Text style={styles.statLabel}>moedas de anúncio</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{app.matches.length}</Text>
              <Text style={styles.statLabel}>matches</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.boostBtn} onPress={handleBoost}>
          <Text style={styles.boostText}>⭐ ATIVAR BOOST COM ANÚNCIO DE 15s</Text>
        </Pressable>

        <Pressable style={styles.resetBtn} onPress={confirmReset}>
          <Text style={styles.resetText}>Reiniciar dados locais do MVP</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing(2),
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'stretch',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
  },
  name: { color: colors.text, fontSize: 22, fontWeight: '900', textAlign: 'center', marginTop: 10 },
  bio: { color: colors.textMuted, textAlign: 'center', marginTop: 6 },
  section: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 15,
    marginTop: spacing(3),
    marginBottom: spacing(1),
  },
  label: { color: colors.textMuted, fontSize: 12, fontWeight: '700', marginTop: spacing(1.5) },
  input: {
    backgroundColor: colors.cardAlt,
    borderRadius: radius.sm,
    padding: spacing(1.5),
    color: colors.text,
    marginTop: 6,
  },
  inputMultiline: { minHeight: 76, textAlignVertical: 'top' },
  smallBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingHorizontal: spacing(2),
    justifyContent: 'center',
    marginTop: 6,
  },
  smallBtnText: { color: '#fff', fontWeight: '800' },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing(2),
  },
  stepperLabel: { color: colors.text, fontWeight: '700' },
  stepperControls: { flexDirection: 'row', alignItems: 'center', gap: spacing(1.5) },
  stepBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: { color: colors.text, fontSize: 18, fontWeight: '900' },
  stepperValue: { color: colors.text, fontWeight: '800', minWidth: 70, textAlign: 'center' },
  savingsCard: { borderColor: colors.green },
  savings: { color: colors.green, fontWeight: '900', fontSize: 16, textAlign: 'center' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: spacing(2) },
  stat: { alignItems: 'center' },
  statValue: { color: colors.text, fontSize: 20, fontWeight: '900' },
  statLabel: { color: colors.textMuted, fontSize: 11 },
  boostBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: spacing(3),
  },
  boostText: { color: '#1A1300', fontWeight: '900' },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  switchLabel: { color: colors.text, fontWeight: '700', fontSize: 15 },
  switchWarn: { color: colors.accent, fontSize: 12, marginTop: 8 },
  resetBtn: { alignItems: 'center', marginTop: spacing(2) },
  resetText: { color: colors.textMuted, fontSize: 12, textDecorationLine: 'underline' },
});
