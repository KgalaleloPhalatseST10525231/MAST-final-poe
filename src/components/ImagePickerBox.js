import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../constants/theme';

/** Tap-to-upload dish photo box. Calls onChange(uri) with the chosen image. */
export default function ImagePickerBox({ uri, onChange, onError }) {
  const pick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.6,
      });
      if (!result.canceled && result.assets?.length) onChange(result.assets[0].uri);
    } catch (e) {
      onError?.('Could not open your photo library. Please check app permissions.');
    }
  };

  return (
    <TouchableOpacity style={[styles.box, !uri && styles.dashed]} onPress={pick} activeOpacity={0.85}>
      {uri ? (
        <>
          <Image source={{ uri }} style={styles.image} resizeMode="cover" />
          <View style={styles.cameraBtn}>
            <Ionicons name="camera" size={20} color="#fff" />
          </View>
        </>
      ) : (
        <View style={styles.empty}>
          <Ionicons name="camera" size={30} color={COLORS.navy} />
          <Text style={styles.title}>Add Food Image</Text>
          <Text style={styles.sub}>Tap to upload (optional)</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: { height: 140, borderRadius: 14, overflow: 'hidden', backgroundColor: '#fff' },
  dashed: { borderWidth: 1.5, borderStyle: 'dashed', borderColor: COLORS.navyLight },
  image: { width: '100%', height: '100%' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 14, fontWeight: '700', color: COLORS.navy, marginTop: 6 },
  sub: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  cameraBtn: {
    position: 'absolute', right: 10, bottom: 10, width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.navy, alignItems: 'center', justifyContent: 'center',
  },
});
