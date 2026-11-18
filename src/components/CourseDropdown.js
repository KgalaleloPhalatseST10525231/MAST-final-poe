import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COURSES, COLORS } from '../constants/theme';
import { fieldStyles } from './FormField';

/** Category dropdown used by the add / edit form. */
export default function CourseDropdown({ value, onChange, error }) {
  return (
    <View>
      <Text style={fieldStyles.label}>Category <Text style={styles.star}>*</Text></Text>
      <View style={[styles.wrap, !!error && styles.wrapError]}>
        <Picker selectedValue={value} onValueChange={onChange} style={styles.picker} dropdownIconColor={COLORS.navy}>
          <Picker.Item label="Select Category" value="" color={COLORS.placeholder} />
          {COURSES.map((c) => (
            <Picker.Item key={c} label={c} value={c} color={COLORS.text} />
          ))}
        </Picker>
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  star: { color: COLORS.red },
  wrap: { backgroundColor: '#fff', borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, overflow: 'hidden' },
  wrapError: { borderColor: COLORS.red },
  picker: { color: COLORS.text },
  error: { color: COLORS.red, fontSize: 13, marginTop: 4 },
});
