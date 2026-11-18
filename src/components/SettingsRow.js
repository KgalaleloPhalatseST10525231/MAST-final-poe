import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOW } from '../constants/theme';

export default function SettingsCard({ icon, title, lines }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={24} color={COLORS.navy} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {lines.map((line) => (
          <Text key={line} style={styles.line}>{line}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: 14, padding: 14, marginBottom: 12, ...SHADOW },
  iconWrap: {
    width: 46, height: 46, borderRadius: 12, backgroundColor: '#E9EDF7',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  title: { fontSize: 16, fontWeight: '800', color: COLORS.text, marginBottom: 2 },
  line: { fontSize: 13, color: COLORS.muted, marginTop: 1 },
});
