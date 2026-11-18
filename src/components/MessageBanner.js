import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOW } from '../constants/theme';

/** Floating success / error toast. message: { type: 'success' | 'error', text } */
export default function MessageBanner({ message }) {
  if (!message) return null;
  const isError = message.type === 'error';
  const color = isError ? COLORS.red : COLORS.green;
  return (
    <View pointerEvents="none" style={styles.wrap}>
      <View style={[styles.box, { borderColor: color, backgroundColor: isError ? COLORS.redLight : COLORS.greenLight }]}>
        <Ionicons name={isError ? 'close-circle' : 'checkmark-circle'} size={20} color={color} />
        <Text style={[styles.text, { color }]}>{message.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', top: 12, left: 16, right: 16, zIndex: 50 },
  box: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, padding: 12, ...SHADOW },
  text: { marginLeft: 8, flex: 1, fontWeight: '700', fontSize: 14 },
});
