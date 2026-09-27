import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { light, radius, spacing } from '../theme';

export default function RegisterScreen() {
  const app = useApp();
  const [name, setName] = useState(app.user.name);
  const [age, setAge] = useState(String(app.user.age));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = name.trim().length > 1 && email.includes('@') && password.length >= 4;

  const submit = () => {
    if (!canSubmit) return;
    app.login('E-mail', {
      name: name.trim(),
      age: Number(age) || app.user.age,
      email: email.trim(),
    });
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>
          Cadastro local — nenhum dado sai do seu aparelho.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            maxLength={3}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="voce@exemplo.com"
            placeholderTextColor={light.textMuted}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="mínimo 4 caracteres"
            placeholderTextColor={light.textMuted}
          />

          <Pressable
            style={[styles.cta, !canSubmit && styles.ctaDisabled]}
            disabled={!canSubmit}
            onPress={submit}
          >
            <Text style={styles.ctaText}>CADASTRAR E ENTRAR</Text>
          </Pressable>

          <Pressable onPress={() => router.back()} style={{ marginTop: spacing(2) }}>
            <Text style={styles.back}>‹ Voltar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: light.bg },
  content: { padding: spacing(2.5), paddingTop: spacing(6) },
  title: { color: light.text, fontSize: 28, fontWeight: '900' },
  subtitle: { color: light.textMuted, marginTop: 4, marginBottom: spacing(3) },
  card: {
    backgroundColor: light.card,
    borderRadius: radius.md,
    padding: spacing(2.5),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  label: { color: light.textMuted, fontSize: 12, fontWeight: '700', marginTop: spacing(1.5) },
  input: {
    backgroundColor: light.bg,
    borderRadius: radius.sm,
    padding: spacing(1.5),
    color: light.text,
    marginTop: 6,
  },
  cta: {
    marginTop: spacing(3),
    backgroundColor: light.accent,
    borderRadius: radius.lg,
    paddingVertical: 15,
    alignItems: 'center',
  },
  ctaDisabled: { opacity: 0.4 },
  ctaText: { color: '#fff', fontWeight: '900' },
  back: { color: light.textMuted, textAlign: 'center' },
});
