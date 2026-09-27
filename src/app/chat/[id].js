import { Stack, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useApp } from '../../store/AppContext';
import { colors, radius, spacing } from '../../theme';

const EMOJIS = [
  '😊', '😂', '🥰', '😍', '😘', '🙂', '😉', '🤗', '😎', '🤔', '😅', '😌',
  '🙏', '🙌', '✨', '🕊️', '⛪', '📖', '💒', '❤️', '💚', '💙', '💛', '💜',
  '🔥', '⭐', '🎉', '🎵', '☕', '🍕', '🌅', '🌻', '💐', '👍', '👏', '🤝',
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const app = useApp();
  const [text, setText] = useState('');
  const [emojisOpen, setEmojisOpen] = useState(false);
  const listRef = useRef(null);

  const match = app.matches.find((m) => m.id === id);
  const messages = app.messages[id] || [];

  if (!match) {
    return (
      <View style={styles.missing}>
        <Stack.Screen options={{ title: 'Conversa' }} />
        <Text style={styles.missingText}>Conversa não encontrada.</Text>
      </View>
    );
  }

  const send = () => {
    const value = text.trim();
    if (!value) return;
    app.sendMessage(match.id, value);
    setText('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <Stack.Screen options={{ title: `${match.profile.name}, ${match.profile.age}` }} />

      <View style={styles.hero}>
        <Image source={{ uri: match.profile.photo }} style={styles.heroPhoto} />
        <Text style={styles.heroText}>
          Vocês deram match! Manda a primeira mensagem sem pagar nada 💚
        </Text>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: spacing(2), gap: spacing(1) }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.author === 'me' ? styles.mine : styles.theirs]}>
            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
        )}
      />

      {emojisOpen && (
        <View style={styles.emojiPanel}>
          <ScrollView style={{ maxHeight: 180 }}>
            <View style={styles.emojiGrid}>
              {EMOJIS.map((e) => (
                <Pressable
                  key={e}
                  style={styles.emojiBtn}
                  onPress={() => setText((t) => `${t}${e}`)}
                >
                  <Text style={styles.emoji}>{e}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      <View style={styles.composer}>
        <Pressable
          style={styles.emojiToggle}
          onPress={() => setEmojisOpen((v) => !v)}
          accessibilityLabel="Emojis"
        >
          <Text style={styles.emojiToggleText}>{emojisOpen ? '⌨️' : '😊'}</Text>
        </Pressable>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Escreva uma mensagem..."
          placeholderTextColor={colors.textMuted}
          onSubmitEditing={send}
          returnKeyType="send"
        />
        <Pressable style={styles.sendBtn} onPress={send} accessibilityLabel="Enviar">
          <Text style={styles.sendText}>➤</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hero: {
    alignItems: 'center',
    paddingVertical: spacing(2),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  heroPhoto: { width: 72, height: 72, borderRadius: 36, borderWidth: 2, borderColor: colors.primary },
  heroText: { color: colors.textMuted, fontSize: 12, marginTop: 8, textAlign: 'center' },
  bubble: { maxWidth: '78%', padding: spacing(1.5), borderRadius: radius.md },
  mine: { alignSelf: 'flex-end', backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  theirs: { alignSelf: 'flex-start', backgroundColor: colors.cardAlt, borderBottomLeftRadius: 4 },
  bubbleText: { color: '#fff', fontSize: 15 },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1),
    padding: spacing(1.5),
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  input: {
    flex: 1,
    backgroundColor: colors.cardAlt,
    borderRadius: radius.lg,
    paddingHorizontal: spacing(2),
    paddingVertical: 12,
    color: colors.text,
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: { color: '#fff', fontSize: 18 },
  emojiPanel: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
    padding: spacing(1),
  },
  emojiGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  emojiBtn: { width: '12.5%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 24 },
  emojiToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiToggleText: { fontSize: 20 },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
  missingText: { color: colors.textMuted },
});
