import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOW } from '../constants/theme';
import { formatPrice } from '../utils/menu';
import DishImage from './DishImage';
import StatusBadge from './StatusBadge';

/** One row in the menu list; tap to open the item's detail screen. */
export default function MenuListItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)} activeOpacity={0.85}>
      <DishImage uri={item.image} course={item.course} style={styles.thumb} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={1}>{item.description}</Text>
        <View style={styles.bottom}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          <StatusBadge available={item.available} />
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card,
    borderRadius: 14, padding: 10, marginBottom: 12, ...SHADOW,
  },
  thumb: { width: 80, height: 80, borderRadius: 12 },
  info: { flex: 1, marginHorizontal: 12 },
  name: { fontSize: 17, fontWeight: '800', color: COLORS.text },
  desc: { fontSize: 13, color: COLORS.muted, marginTop: 2 },
  bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  price: { fontSize: 16, fontWeight: '800', color: COLORS.text },
});
