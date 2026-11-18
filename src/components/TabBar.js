import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const TABS = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'menu', label: 'Menu', icon: 'restaurant' },
  { key: 'settings', label: 'Settings', icon: 'settings' },
];

/** Bottom navigation between the three main sections. */
export default function TabBar({ active, onChange }) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const selected = tab.key === active;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onChange(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
          >
            <Ionicons
              name={selected ? tab.icon : `${tab.icon}-outline`}
              size={24}
              color={selected ? COLORS.navy : COLORS.muted}
            />
            <Text style={[styles.label, selected && styles.labelActive]}>{tab.label}</Text>
            <View style={[styles.indicator, selected && styles.indicatorActive]} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border },
  tab: { flex: 1, alignItems: 'center', paddingTop: 8, paddingBottom: 6 },
  label: { fontSize: 12, color: COLORS.muted, marginTop: 2, fontWeight: '600' },
  labelActive: { color: COLORS.navy },
  indicator: { height: 3, width: 28, borderRadius: 2, marginTop: 4, backgroundColor: 'transparent' },
  indicatorActive: { backgroundColor: COLORS.green },
});
