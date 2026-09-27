import { router } from 'expo-router';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../store/AppContext';
import { colors, radius, spacing } from '../theme';

const BG_IMAGE =
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900';

export default function WelcomeScreen() {
  const app = useApp();

  const socialLogin = (provider) => {
    app.login(provider);
    router.replace('/');
  };

  return (
    <ImageBackground source={{ uri: BG_IMAGE }} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safe}>
        <View style={styles.hero}>
          <Text style={styles.logo}>
            Match<Text style={{ color: '#fff' }}>Free</Text>
            <Text style={{ color: colors.accent || '#FFD166' }}> ✝</Text>
          </Text>
          <Text style={styles.tagline}>Relacionamentos com propósito, nos preceitos bíblicos.</Text>
          <Text style={styles.free}>100% grátis — desbloqueie tudo assistindo anúncios curtos.</Text>
        </View>

        <View style={styles.buttons}>
          <Pressable style={[styles.btn, styles.btnGoogle]} onPress={() => socialLogin('Google')}>
            <Text style={[styles.btnText, { color: '#1F1F1F' }]}>G  Continuar com Google</Text>
          </Pressable>

          <Pressable style={[styles.btn, styles.btnFacebook]} onPress={() => socialLogin('Facebook')}>
            <Text style={styles.btnText}>f  Continuar com Facebook</Text>
          </Pressable>

          <Pressable style={[styles.btn, styles.btnApple]} onPress={() => socialLogin('Apple')}>
            <Text style={styles.btnText}>  Continuar com Apple</Text>
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.divider} />
          </View>

          <Pressable style={[styles.btn, styles.btnSignup]} onPress={() => router.push('/register')}>
            <Text style={styles.btnText}>✉️  Cadastre-se com e-mail</Text>
          </Pressable>

          <Text style={styles.terms}>
            Ao continuar você concorda com os Termos e a Política de Privacidade.
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,8,16,0.72)' },
  safe: { flex: 1, justifyContent: 'space-between', padding: spacing(3) },
  hero: { marginTop: spacing(8), alignItems: 'center' },
  logo: { color: colors.primary, fontSize: 44, fontWeight: '900' },
  tagline: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    marginTop: spacing(2),
    maxWidth: 320,
  },
  free: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: spacing(1) },
  buttons: { gap: spacing(1.5) },
  btn: {
    borderRadius: radius.lg,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  btnGoogle: { backgroundColor: '#fff' },
  btnFacebook: { backgroundColor: '#1877F2' },
  btnApple: { backgroundColor: '#000', borderWidth: 1, borderColor: '#444' },
  btnSignup: { backgroundColor: colors.primary },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing(1) },
  divider: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.25)' },
  dividerText: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
  terms: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 11,
    textAlign: 'center',
    marginTop: spacing(1),
  },
});
