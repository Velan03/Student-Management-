import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { toast } from 'sonner-native';

export default function HomeworkSnap({ onSubmit }) {
  const [image, setImage] = useState(null);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      toast.success('Homework photo captured!');
      if (onSubmit) onSubmit(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <Pressable style={styles.button} onPress={takePhoto}>
          <MaterialIcons name="add-a-photo" size={24} color="#fff" />
          <Text style={styles.buttonText}>Snap Homework</Text>
        </Pressable>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image }} style={styles.preview} />
          <Pressable style={styles.retakeButton} onPress={() => setImage(null)}>
            <MaterialIcons name="refresh" size={20} color="#fff" />
            <Text style={styles.retakeText}>Retake</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#1a73e8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  previewContainer: {
    position: 'relative',
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  retakeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    gap: 4,
  },
  retakeText: {
    color: '#fff',
    fontSize: 14,
  },
});