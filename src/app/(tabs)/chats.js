import { router } from 'expo-router';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../store/AppContext';
import { colors, radius, spacing } from '../../theme';

export default function ChatsScreen() {
  const { matches, messages } = useApp();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Conversas</Text>
        <Text style={styles.subtitle}>{matches.length} matches ativos</Text>
      </View>

      {matches.length > 0 && (
        <FlatList
          horizontal
          data={matches}
          keyExtractor={(m) => `story-${m.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.stories}
          renderItem={({ item }) => (
            <Pressable style={styles.story} onPress={() => router.push(`/chat/${item.id}`)}>
              <Image source={{ uri: item.profile.photo }} style={styles.storyPhoto} />
              <Text style={styles.storyName} numberOfLines={1}>
                {item.profile.name}
              </Text>
            </Pressable>
          )}
        />
      )}

      <FlatList
        data={matches}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: spacing(2), gap: spacing(1) }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>💬</Text>
            <Text style={styles.emptyTitle}>Nenhuma conversa ainda</Text>
            <Text style={styles.emptyText}>
              Dê match na aba Descobrir ou desbloqueie quem já te curtiu.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const list = messages[item.id] || [];
          const last = list[list.length - 1];
          return (
            <Pressable style={styles.row} onPress={() => router.push(`/chat/${item.id}`)}>
              <Image source={{ uri: item.profile.photo }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>
                  {item.profile.name}, {item.profile.age}
                </Text>
                <Text style={styles.preview} numberOfLines={1}>
                  {last ? `${last.author === 'me' ? 'Você: ' : ''}${last.text}` : 'Diga oi!'}
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing(2), paddingTop: spacing(1) },
  title: { color: colors.text, fontSize: 26, fontWeight: '900' },
  subtitle: { color: colors.textMuted, marginTop: 2, fontSize: 13 },
  stories: { paddingHorizontal: spacing(2), paddingTop: spacing(2), gap: spacing(1.5) },
  story: { alignItems: 'center', width: 70 },
  storyPhoto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  storyName: { color: colors.textMuted, fontSize: 11, marginTop: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing(1.5),
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing(1.5),
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: { width: 54, height: 54, borderRadius: 27 },
  name: { color: colors.text, fontWeight: '800', fontSize: 15 },
  preview: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  chevron: { color: colors.textMuted, fontSize: 26 },
  empty: { alignItems: 'center', marginTop: spacing(6) },
  emptyEmoji: { fontSize: 46 },
  emptyTitle: { color: colors.text, fontWeight: '800', fontSize: 18, marginTop: spacing(1) },
  emptyText: { color: colors.textMuted, textAlign: 'center', marginTop: 6, maxWidth: 280 },
});
