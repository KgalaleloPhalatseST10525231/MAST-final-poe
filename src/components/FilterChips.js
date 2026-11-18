import React from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COURSES, COLORS } from '../constants/theme';

/** "All" + one chip per course. An empty value means "All". */
export default function FilterChips({ value, onChange }) {
  const options = ['', ...COURSES];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}
    >
      {options.map((course) => {
        const selected = value === course;
        return (
          <TouchableOpacity
            key={course || 'all'}
            style={[styles.chip, selected && styles.chipActive]}
            onPress={() => onChange(course)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
          >
            <Text style={[styles.text, selected && styles.textActive]}>{course || 'All'}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  row: { paddingVertical: 4, alignItems: 'center' },
  chip: {
    paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, marginRight: 8,
    backgroundColor: '#E9EDF7',
  },
  chipActive: { backgroundColor: COLORS.green },
  text: { fontSize: 14, fontWeight: '700', color: COLORS.navy },
  textActive: { color: '#fff' },
});
