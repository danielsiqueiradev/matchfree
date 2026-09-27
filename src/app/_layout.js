import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RewardedAdProvider } from '../components/RewardedAdProvider';
import { AppProvider } from '../store/AppContext';
import { colors, light } from '../theme';

const lightHeader = {
  headerStyle: { backgroundColor: light.bg },
  headerTintColor: light.text,
  contentStyle: { backgroundColor: light.bg },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg }}>
      <SafeAreaProvider>
        <AppProvider>
          <RewardedAdProvider>
            <StatusBar style="light" />
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: colors.bg },
                headerTintColor: colors.text,
                headerTitleStyle: { fontWeight: '800' },
                contentStyle: { backgroundColor: colors.bg },
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="welcome" options={{ headerShown: false }} />
              <Stack.Screen name="register" options={{ title: 'Cadastre-se', ...lightHeader }} />
              <Stack.Screen name="chat/[id]" options={{ title: 'Conversa' }} />
              <Stack.Screen
                name="edit-profile"
                options={{ title: 'Configurações', ...lightHeader }}
              />
              <Stack.Screen name="filters" options={{ title: 'Filtrar Perfis', ...lightHeader }} />
              <Stack.Screen name="menu/[key]" options={lightHeader} />
            </Stack>
          </RewardedAdProvider>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
