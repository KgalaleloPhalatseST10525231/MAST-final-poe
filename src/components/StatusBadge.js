import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function StatusBadge({ available }) {
  return (
    <View style={[styles.badge, { backgroundColor: available ? COLORS.greenLight : COLORS.redLight }]}>
      <Text style={[styles.text, { color: available ? COLORS.green : COLORS.red }]}>
        {available ? 'Available' : 'Unavailable'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 14, alignSelf: 'flex-start' },
  text: { fontSize: 12, fontWeight: '700' },
});
