import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const moods = [
  { emoji: 'grin-beam', label: 'Great', color: '#4CAF50' },
  { emoji: 'smile', label: 'Good', color: '#2196F3' },
  { emoji: 'meh', label: 'Okay', color: '#FF9800' },
  { emoji: 'frown', label: 'Not Great', color: '#F44336' },
];

export default function MoodSelector({ onMoodSelect }) {
  const [selected, setSelected] = React.useState(null);
  const scaleAnim = React.useRef(moods.map(() => new Animated.Value(1))).current;

  const handleMoodSelect = (index) => {
    setSelected(index);
    onMoodSelect(moods[index]);

    // Animate the selected mood
    Animated.sequence([
      Animated.timing(scaleAnim[index], {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim[index], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <View style={styles.moodContainer}>
        {moods.map((mood, index) => (
          <Animated.View
            key={mood.emoji}
            style={[
              styles.moodButton,
              { transform: [{ scale: scaleAnim[index] }] },
            ]}
          >
            <Pressable
              onPress={() => handleMoodSelect(index)}
              style={[
                styles.moodCircle,
                selected === index && { backgroundColor: mood.color },
              ]}
            >
              <FontAwesome5
                name={mood.emoji}
                size={24}
                color={selected === index ? 'white' : mood.color}
              />
            </Pressable>
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  moodButton: {
    alignItems: 'center',
  },
  moodCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  moodLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
});