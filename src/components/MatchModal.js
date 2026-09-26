import { useEffect, useState } from 'react';
import { Animated, Easing, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

export default function MatchModal({ visible, user, profile, onMessage, onKeepSwiping }) {
  const [scale] = useState(() => new Animated.Value(0.6));
  const [pulse] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!visible) {
      scale.setValue(0.6);
      return undefined;
    }
    Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true }).start();
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [visible, scale, pulse]);

  if (!profile) return null;

  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onKeepSwiping}>
      <View style={styles.backdrop}>
        <Animated.View style={{ transform: [{ scale }], alignItems: 'center', width: '100%' }}>
          <Animated.Text style={[styles.title, { transform: [{ scale: pulseScale }] }]}>
            DEU MATCH! 🔥
          </Animated.Text>
          <Text style={styles.subtitle}>
            Você e {profile.name} se curtiram. Sem pagar nada por isso 😉
          </Text>

          <View style={styles.avatars}>
            <Image source={{ uri: user.photo }} style={[styles.avatar, styles.avatarLeft]} />
            <Image source={{ uri: profile.photo }} style={[styles.avatar, styles.avatarRight]} />
            <View style={styles.heart}>
              <Text style={styles.heartText}>💚</Text>
            </View>
          </View>

          <Pressable style={styles.primary} onPress={onMessage}>
            <Text style={styles.primaryText}>MANDAR MENSAGEM</Text>
          </Pressable>
          <Pressable style={styles.secondary} onPress={onKeepSwiping}>
            <Text style={styles.secondaryText}>CONTINUAR SWIPANDO</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(10,8,16,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing(3),
  },
  title: { color: colors.primary, fontSize: 40, fontWeight: '900', textAlign: 'center' },
  subtitle: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing(1),
    fontSize: 15,
    maxWidth: 320,
  },
  avatars: {
    flexDirection: 'row',
    marginVertical: spacing(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  avatarLeft: { marginRight: -18, transform: [{ rotate: '-6deg' }] },
  avatarRight: { marginLeft: -18, transform: [{ rotate: '6deg' }] },
  heart: {
    position: 'absolute',
    backgroundColor: colors.card,
    borderRadius: 30,
    padding: 8,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  heartText: { fontSize: 26 },
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: spacing(4),
    borderRadius: radius.lg,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  primaryText: { color: '#fff', fontWeight: '900', letterSpacing: 0.5 },
  secondary: {
    marginTop: spacing(1.5),
    paddingVertical: 14,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryText: { color: colors.textMuted, fontWeight: '800' },
});
