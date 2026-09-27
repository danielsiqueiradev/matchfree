import { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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

export default function EditProfileScreen() {
  const app = useApp();
  const [photo, setPhoto] = useState(app.user.photo);

  const confirmReset = () => {
    const question = 'Reiniciar MVP? Isso apaga login, matches, mensagens e desbloqueios locais.';
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
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: spacing(2) }}>
        <View style={styles.card}>
          <Image source={{ uri: app.user.photo }} style={styles.avatar} />
          <Text style={styles.name}>
            {app.user.name}, {app.user.age}
          </Text>
          {app.authProvider && (
            <Text style={styles.provider}>Entrou via {app.authProvider}</Text>
          )}
        </View>

        <View style={[styles.card, { marginTop: spacing(2) }]}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={app.user.name}
            onChangeText={(name) => app.updateUser({ name })}
          />

          <Text style={styles.label}>Localização</Text>
          <TextInput
            style={styles.input}
            value={app.user.location}
            onChangeText={(location) => app.updateUser({ location })}
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            value={app.user.bio}
            multiline
            onChangeText={(bio) => app.updateUser({ bio })}
          />

          <Text style={styles.label}>URL da foto</Text>
          <View style={{ flexDirection: 'row', gap: spacing(1) }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={photo}
              onChangeText={setPhoto}
              autoCapitalize="none"
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

        <Pressable style={styles.resetBtn} onPress={confirmReset}>
          <Text style={styles.resetText}>Sair e reiniciar dados locais do MVP</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: light.bg },
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
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: light.accent,
  },
  name: { color: light.text, fontSize: 22, fontWeight: '900', textAlign: 'center', marginTop: 10 },
  provider: { color: light.textMuted, textAlign: 'center', marginTop: 4, fontSize: 12 },
  label: { color: light.textMuted, fontSize: 12, fontWeight: '700', marginTop: spacing(1.5) },
  input: {
    backgroundColor: light.bg,
    borderRadius: radius.sm,
    padding: spacing(1.5),
    color: light.text,
    marginTop: 6,
  },
  inputMultiline: { minHeight: 76, textAlignVertical: 'top' },
  smallBtn: {
    backgroundColor: light.accent,
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
  resetBtn: { alignItems: 'center', marginTop: spacing(3) },
  resetText: { color: light.textMuted, fontSize: 12, textDecorationLine: 'underline' },
});
