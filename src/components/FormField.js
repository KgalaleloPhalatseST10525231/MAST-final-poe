import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

/** Labelled text input with a required marker and inline validation message. */
export default function FormField({ label, required, error, multiline, ...inputProps }) {
  return (
    <View>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.star}> *</Text>}
      </Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline, !!error && styles.inputError]}
        placeholderTextColor={COLORS.placeholder}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...inputProps}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

export const fieldStyles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginTop: 14, marginBottom: 6 },
});

const styles = StyleSheet.create({
  ...fieldStyles,
  star: { color: COLORS.red },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: COLORS.border, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, color: COLORS.text,
  },
  multiline: { minHeight: 90 },
  inputError: { borderColor: COLORS.red },
  error: { color: COLORS.red, fontSize: 13, marginTop: 4 },
});
