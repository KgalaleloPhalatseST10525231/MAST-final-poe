import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOW } from '../constants/theme';

export default function StatCard({ icon, iconColor = COLORS.green, label, value, style }) {
  return (
    <View style={[styles.card, style]}>
      <View style={[styles.iconWrap, { backgroundColor: `${iconColor}1A` }]}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.value} numberOfLines={1}>{value}</Text>
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card,
    borderRadius: 14, padding: 12, ...SHADOW,
  },
  iconWrap: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  value: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  label: { fontSize: 12, color: COLORS.muted, marginTop: 1 },
});
