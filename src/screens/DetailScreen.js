import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { formatPrice } from '../utils/menu';
import DishImage from '../components/DishImage';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';

export default function DetailScreen({ item, onBack, onEdit, onDelete }) {
  if (!item) return null;
  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrap}>
          <DishImage uri={item.image} course={item.course} emojiSize={90} />
          <TouchableOpacity style={[styles.roundBtn, { left: 16 }]} onPress={onBack} accessibilityLabel="Go back">
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.roundBtn, { right: 16 }]} onPress={() => onEdit(item)} accessibilityLabel="Edit item">
            <Ionicons name="create-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.sheet}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{item.name}</Text>
            <StatusBadge available={item.available} />
          </View>
          <Text style={styles.desc}>{item.description}</Text>

          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}><Ionicons name="cash-outline" size={20} color={COLORS.navy} /></View>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}><Ionicons name="restaurant-outline" size={20} color={COLORS.navy} /></View>
            <Text style={styles.course}>{item.course}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button variant="danger" icon="trash-outline" title="Delete Item" onPress={() => onDelete(item)} style={styles.footBtn} />
        <View style={{ width: 12 }} />
        <Button icon="create-outline" title="Edit Item" onPress={() => onEdit(item)} style={styles.footBtn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.card },
  imageWrap: { height: 260, backgroundColor: COLORS.navy },
  roundBtn: {
    position: 'absolute', top: 14, width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(14,31,77,0.65)', alignItems: 'center', justifyContent: 'center',
  },
  sheet: { backgroundColor: COLORS.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -24, padding: 20 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { flex: 1, fontSize: 26, fontWeight: '800', color: COLORS.text, marginRight: 10 },
  desc: { fontSize: 16, color: COLORS.muted, lineHeight: 23, marginTop: 10 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 18 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  infoIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#E9EDF7', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  price: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  course: { fontSize: 17, fontWeight: '600', color: COLORS.text },
  footer: { flexDirection: 'row', padding: 16, borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.card },
  footBtn: { flex: 1, paddingVertical: 13 },
});
