import { Stack, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRewardedAd } from '../../components/RewardedAdProvider';
import { useApp } from '../../store/AppContext';
import { light, radius, spacing } from '../../theme';

const CONTENT = {
  premium: {
    title: 'Benefícios Premium',
    body: 'No MatchFree, o "premium" é sempre gratuito — você libera tudo com anúncios curtos de 15s:\n\n• Ver quem te curtiu (sem pagar assinatura)\n• Rewind: desfazer um swipe errado\n• Boost: 30 minutos de destaque na região\n\nNenhum cartão de crédito. Nunca.',
  },
  share: {
    title: 'Compartilhar o Aplicativo',
    body: 'Convide seus amigos para o MatchFree! Compartilhe o link:\n\nhttps://dist-web-hyphmthw.devinapps.com\n\n"Conheci um app de relacionamento cristão 100% grátis — sem assinatura, só anúncios de 15 segundos."',
  },
  support: {
    title: 'Fale Conosco / Suporte',
    body: 'Precisa de ajuda? Fale com a gente:\n\n✉️ suporte@matchfree.app\n\nResponderemos em até 24h úteis. No MVP, este canal é apenas demonstrativo.',
  },
  credits: {
    title: 'Créditos',
    body: 'Sua economia com o MatchFree:',
  },
  plan: {
    title: 'Meu Plano',
    body: 'Todos os recursos premium são desbloqueados assistindo anúncios de 15s — ou tudo liberado com o VIP, sem anúncio nenhum.',
  },
  help: {
    title: 'Como utilizar o Aplicativo',
    body: '1. Na aba Principal, arraste cards: direita = curtir, esquerda = passar.\n2. Curtida mútua vira um Match na hora.\n3. Em "Quem te curtiu", assista 15s de anúncio para revelar seus admiradores.\n4. Use REWIND e BOOST — também liberados por anúncios.\n5. Converse livremente com seus matches em Contatos.\n\nOração e um bom perfil: a receita do match perfeito 🙏',
  },
  terms: {
    title: 'Termos e Condições',
    body: 'Termos demonstrativos do MVP: o MatchFree é um aplicativo 100% gratuito para fins de demonstração. Dados fictícios, armazenados apenas no seu aparelho.',
  },
  privacy: {
    title: 'Política de Privacidade',
    body: 'Política demonstrativa do MVP: nenhum dado é enviado a servidores. Perfis, matches e mensagens ficam no armazenamento local do aparelho e podem ser apagados a qualquer momento nas Configurações.',
  },
};

export default function MenuScreen() {
  const { key } = useLocalSearchParams();
  const app = useApp();
  const { showRewardedAd } = useRewardedAd();
  const item = CONTENT[key] || { title: 'Opções', body: 'Em breve.' };

  const handleBuyVip = () => {
    const msg =
      'Compra simulada do MVP: ativar MatchFree VIP por R$ 19,90/mês? Todos os recursos passam a liberar sem anúncios.';
    if (typeof window !== 'undefined' && window.confirm) {
      if (window.confirm(msg)) app.buyVip();
      return;
    }
    Alert.alert('MatchFree VIP', msg, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Assinar', onPress: app.buyVip },
    ]);
  };

  const handleBoost = async () => {
    const ok = await showRewardedAd({
      title: 'Destacar seu perfil (Boost)',
      reward: '30 minutos de destaque na região',
    });
    if (ok) app.boost();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Stack.Screen options={{ title: item.title }} />
      <ScrollView contentContainerStyle={{ padding: spacing(2) }}>
        <View style={styles.card}>
          <Text style={styles.body}>{item.body}</Text>

          {key === 'credits' && (
            <View style={styles.statsBox}>
              <Text style={styles.statsLine}>
                R$ {app.savings.toFixed(2).replace('.', ',')} economizados em assinaturas
              </Text>
              <Text style={styles.statsSub}>
                {app.adsWatched} anúncios assistidos · {app.adCoins} moedas de anúncio ·{' '}
                {app.matches.length} matches
              </Text>
            </View>
          )}

          {key === 'plan' && (
            <View style={styles.statsBox}>
              <Text style={styles.statsLine}>
                {app.vip ? '👑 VIP ativo — zero anúncios' : 'Plano atual: Grátis com anúncios'}
              </Text>
              {!app.vip && (
                <>
                  <Text style={styles.statsSub}>
                    {'👑 MatchFree VIP — tudo liberado sem anúncios:\n• Ver quem te curtiu sem anúncio\n• Rewind e Boost ilimitados\n• R$ 19,90/mês (simulado no MVP)'}
                  </Text>
                  <Pressable style={[styles.cta, styles.vipBtn]} onPress={handleBuyVip}>
                    <Text style={styles.ctaText}>👑 ASSINAR VIP — R$ 19,90/mês</Text>
                  </Pressable>
                </>
              )}
              <Pressable style={styles.cta} onPress={handleBoost}>
                <Text style={styles.ctaText}>
                  ⭐ {app.vip ? 'ATIVAR BOOST (VIP)' : 'ATIVAR BOOST COM ANÚNCIO DE 15s'}
                </Text>
              </Pressable>
            </View>
          )}

          {key === 'premium' && (
            <View style={styles.statsBox}>
              <Text style={styles.statsLine}>
                {app.boostRank ? `Boost ativo: Top ${app.boostRank}%` : 'Boost inativo'}
              </Text>
              <Pressable style={styles.cta} onPress={handleBoost}>
                <Text style={styles.ctaText}>⭐ ATIVAR BOOST COM ANÚNCIO DE 15s</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: light.bg },
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
  body: { color: light.text, fontSize: 15, lineHeight: 23 },
  statsBox: { marginTop: spacing(2), borderTopWidth: 1, borderTopColor: light.border, paddingTop: spacing(2) },
  statsLine: { color: light.accent, fontWeight: '900', fontSize: 16 },
  statsSub: { color: light.textMuted, fontSize: 13, marginTop: 4 },
  cta: {
    marginTop: spacing(1.5),
    backgroundColor: light.accent,
    borderRadius: radius.lg,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: { color: '#fff', fontWeight: '900', fontSize: 12 },
  vipBtn: { backgroundColor: '#8E44AD', marginBottom: spacing(1) },
});
