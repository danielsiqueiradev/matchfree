# MatchFree 💚

MVP de um app de relacionamento **cristão** estilo Tinder, **100% gratuito**: todos os recursos
"premium" (ver quem te curtiu, rewind e boost) são liberados assistindo a um **anúncio recompensado
simulado de 15 segundos** — nunca com dinheiro. Temática voltada a relacionamentos nos
preceitos bíblicos: bios dos perfis, respostas automáticas do chat e textos refletem isso.
Preferências permitem ligar/desligar a exibição de perfis de homens e de mulheres.

Stack: **React Native + Expo (SDK 57) + Expo Router**. Arquitetura **100% offline**: nenhum
servidor, todos os dados (perfis, matches, mensagens, preferências, contadores) ficam em
`AsyncStorage` no aparelho.

## Como rodar

```bash
npm install
npx expo start        # escolha: a (Android), i (iOS) ou w (Web)
npx expo start --web  # roda direto no navegador
```

Para rodar no celular, instale o **Expo Go** e escaneie o QR code.

## Telas

| Tela | Arquivo | O que faz |
| --- | --- | --- |
| Descoberta | `src/app/(tabs)/index.js` | Baralho de cards com swipe (arrastar ou botões), header com moedas de anúncio e status do boost, botões Rewind / Passar / Boost / Curtir |
| Deu Match! | `src/components/MatchModal.js` | Modal animado disparado em curtida mútua (Camila e Juliana já curtiram o Alex) |
| Quem te curtiu | `src/app/(tabs)/likes.js` | Perfis borrados + banner "assista 15s para ver quem é" → desbloqueio com anúncio |
| Conversas | `src/app/(tabs)/chats.js` e `src/app/chat/[id].js` | Lista de matches e chat com mensagens salvas localmente (com resposta automática simulada) |
| Perfil | `src/app/(tabs)/profile.js` | Edição de nome/bio/foto/idade, preferências (faixa etária e distância) e estatísticas de economia |

## Como o "AdMob" é simulado

`src/components/RewardedAdProvider.js` expõe o hook `useRewardedAd()`:

```js
const { showRewardedAd } = useRewardedAd();
const ok = await showRewardedAd({ title: 'Ver quem te curtiu', reward: 'Revelar 2 perfis' });
if (ok) app.unlockAdmirers(); // só libera se o usuário assistiu os 15s
```

O modal mostra um criativo fake, barra de progresso, contador regressivo de 15s e só habilita
"RESGATAR RECOMPENSA" no fim. Pular antes do tempo resolve `false` e nada é liberado.
Cada anúncio completo soma 1 moeda e R$ 5,00 ao contador de economia.

Para trocar pela AdMob real, substitua o corpo de `showRewardedAd` pelo
`RewardedAd` do `react-native-google-mobile-ads` — a assinatura (`Promise<boolean>`) continua igual.

## Estado e persistência

`src/store/AppContext.js` concentra tudo num `useReducer` persistido em
`AsyncStorage` sob a chave `@matchfree/state/v1`:
baralho, cursor, histórico (para o rewind), matches, mensagens, desbloqueio dos admiradores,
moedas, anúncios assistidos, boost e preferências.

Dados mock em `src/data/mock.js`. O botão "Reiniciar dados locais do MVP" (aba Perfil) limpa tudo.
