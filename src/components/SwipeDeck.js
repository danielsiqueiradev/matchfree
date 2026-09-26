import { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, radius, spacing } from '../theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = Math.min(SCREEN_WIDTH, 480) * 0.25;

function ProfileCard({ profile, style, children }) {
  return (
    <Animated.View style={[styles.card, style]}>
      <Image source={{ uri: profile.photo }} style={styles.photo} resizeMode="cover" />
      <View style={styles.gradient} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {profile.name}, <Text style={styles.age}>{profile.age}</Text>
        </Text>
        <Text style={styles.distance}>📍 a {profile.distance} km de você</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
      </View>
      {children}
    </Animated.View>
  );
}

const SwipeDeck = forwardRef(function SwipeDeck({ profiles, cursor, onSwipe }, ref) {
  const [position] = useState(() => new Animated.ValueXY());
  const current = profiles[cursor] || null;
  const next = profiles[cursor + 1] || null;
  const forceSwipe = (direction) => {
    const profile = current;
    if (!profile) return;
    const x = direction === 'right' ? SCREEN_WIDTH + 200 : -SCREEN_WIDTH - 200;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 220,
      useNativeDriver: false,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
      onSwipe(profile, direction);
    });
  };

  useImperativeHandle(ref, () => ({
    swipeLeft: () => forceSwipe('left'),
    swipeRight: () => forceSwipe('right'),
  }));

  // Recriado a cada render para enxergar sempre o card do topo.
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gesture) =>
      Math.abs(gesture.dx) > 4 || Math.abs(gesture.dy) > 4,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) forceSwipe('right');
      else if (gesture.dx < -SWIPE_THRESHOLD) forceSwipe('left');
      else
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
    },
  });

  if (!current) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🫠</Text>
        <Text style={styles.emptyTitle}>Acabaram os perfis por aqui</Text>
        <Text style={styles.emptyText}>
          Use o REWIND para rever alguém ou dê um BOOST para aparecer mais.
        </Text>
      </View>
    );
  }

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
    outputRange: ['-25deg', '0deg', '25deg'],
  });
  const likeOpacity = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.deck}>
      {next && (
        <ProfileCard profile={next} style={[styles.behind]} />
      )}
      <View style={styles.front} {...panResponder.panHandlers}>
        <ProfileCard
          profile={current}
          style={{
            transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }],
          }}
        >
          <Animated.View style={[styles.stamp, styles.stampLike, { opacity: likeOpacity }]}>
            <Text style={[styles.stampText, { color: colors.green }]}>CURTIU</Text>
          </Animated.View>
          <Animated.View style={[styles.stamp, styles.stampNope, { opacity: nopeOpacity }]}>
            <Text style={[styles.stampText, { color: colors.danger }]}>PASSOU</Text>
          </Animated.View>
        </ProfileCard>
      </View>
    </View>
  );
});

export default SwipeDeck;

const styles = StyleSheet.create({
  deck: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  front: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  behind: { transform: [{ scale: 0.94 }, { translateY: 14 }], opacity: 0.6 },
  card: {
    width: '100%',
    maxWidth: 420,
    height: '100%',
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  photo: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
    backgroundColor: 'rgba(10,8,16,0.62)',
  },
  info: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: spacing(2.5) },
  name: { color: '#fff', fontSize: 30, fontWeight: '900' },
  age: { fontWeight: '400' },
  distance: { color: 'rgba(255,255,255,0.85)', marginTop: 4, fontSize: 13 },
  bio: { color: 'rgba(255,255,255,0.92)', marginTop: spacing(1), fontSize: 15, lineHeight: 21 },
  stamp: {
    position: 'absolute',
    top: 32,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 4,
    borderRadius: radius.sm,
  },
  stampLike: { left: 22, borderColor: colors.green, transform: [{ rotate: '-18deg' }] },
  stampNope: { right: 22, borderColor: colors.danger, transform: [{ rotate: '18deg' }] },
  stampText: { fontSize: 26, fontWeight: '900', letterSpacing: 2 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing(3) },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { color: colors.text, fontSize: 20, fontWeight: '800', marginTop: spacing(1) },
  emptyText: { color: colors.textMuted, textAlign: 'center', marginTop: spacing(1) },
});
