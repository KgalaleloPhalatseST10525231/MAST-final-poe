import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

/** Navy screen header with optional back button and right-hand action icon. */
export default function Header({ title, subtitle, onBack, rightIcon, onRightPress, centered }) {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.side} accessibilityLabel="Go back">
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
        ) : (
          !!centered && <View style={styles.side} />
        )}
        <View style={[styles.titleWrap, centered && styles.centered]}>
          <Text style={styles.title}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress} style={styles.side} accessibilityLabel="Action">
            <Ionicons name={rightIcon} size={26} color="#fff" />
          </TouchableOpacity>
        ) : (
          !!centered && <View style={styles.side} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: COLORS.navy, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 18 },
  row: { flexDirection: 'row', alignItems: 'center' },
  side: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  titleWrap: { flex: 1, paddingLeft: 4 },
  centered: { alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: '#fff' },
  subtitle: { fontSize: 14, color: '#B9C4E4', marginTop: 2 },
});
