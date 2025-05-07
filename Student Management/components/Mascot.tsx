import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';

const MASCOT_STATES = {
  IDLE: require('../assets/animations/mascot-idle.json'),
  HAPPY: require('../assets/animations/mascot-happy.json'),
  THINKING: require('../assets/animations/mascot-thinking.json'),
};

export default function Mascot({ mood = 'IDLE' }) {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const mascotRef = useRef(null);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -10],
              }),
            },
          ],
        },
      ]}
    >
      <LottieView
        ref={mascotRef}
        source={MASCOT_STATES[mood]}
        autoPlay
        loop
        style={styles.mascot}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginVertical: 10,
  },
  mascot: {
    width: '100%',
    height: '100%',
  },
});