import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

/** Reusable button. variant: 'primary' | 'outline' | 'danger' | 'secondary' */
export default function Button({ title, onPress, variant = 'primary', icon, style }) {
  const color = TEXT_COLOR[variant];
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], style]}
      onPress={onPress}
      accessibilityRole="button"
      activeOpacity={0.8}
    >
      <View style={styles.row}>
        {!!icon && <Ionicons name={icon} size={19} color={color} style={styles.icon} />}
        <Text style={[styles.text, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const TEXT_COLOR = {
  primary: '#fff', outline: COLORS.navy, danger: COLORS.red, secondary: COLORS.muted,
};

const styles = StyleSheet.create({
  base: { borderRadius: 14, paddingVertical: 15, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 8 },
  text: { fontSize: 16, fontWeight: '700' },
  primary: { backgroundColor: COLORS.navy },
  outline: { borderWidth: 1.5, borderColor: COLORS.navy, backgroundColor: '#fff' },
  danger: { borderWidth: 1.5, borderColor: COLORS.red, backgroundColor: '#fff' },
  secondary: { backgroundColor: 'transparent' },
});
