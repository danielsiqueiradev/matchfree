import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { useApp } from '../../store/AppContext';
import { colors } from '../../theme';

function TabIcon({ emoji, color, focused }) {
  return (
    <Text style={{ fontSize: focused ? 24 : 21, opacity: focused ? 1 : 0.6, color }}>{emoji}</Text>
  );
}

function Badge({ count }) {
  if (!count) return null;
  return (
    <View
      style={{
        position: 'absolute',
        top: -4,
        right: -10,
        backgroundColor: colors.primary,
        borderRadius: 9,
        minWidth: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 11, fontWeight: '900' }}>{count}</Text>
    </View>
  );
}

export default function TabsLayout() {
  const { admirers, admirersUnlocked, matches } = useApp();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Descobrir',
          tabBarIcon: (props) => <TabIcon emoji="🔥" {...props} />,
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          title: 'Quem te curtiu',
          tabBarIcon: (props) => (
            <View>
              <TabIcon emoji="💘" {...props} />
              <Badge count={admirersUnlocked ? 0 : admirers.length} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Conversas',
          tabBarIcon: (props) => (
            <View>
              <TabIcon emoji="💬" {...props} />
              <Badge count={matches.length} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: (props) => <TabIcon emoji="👤" {...props} />,
        }}
      />
    </Tabs>
  );
}
