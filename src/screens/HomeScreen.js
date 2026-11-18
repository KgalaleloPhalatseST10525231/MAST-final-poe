import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOW } from '../constants/theme';
import { formatPrice } from '../utils/menu';
import StatCard from '../components/StatCard';
import Button from '../components/Button';

const ACTIVITY_ICON = {
  added: { name: 'add-circle', color: COLORS.green },
  updated: { name: 'create', color: COLORS.navyLight },
  deleted: { name: 'trash', color: COLORS.red },
};

export default function HomeScreen({ stats, activity, onAdd, onViewAll }) {
  const { total, unavailable, average, perCourse } = stats;
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.circleBig} />
        <View style={styles.circleSmall} />
        <Ionicons name="restaurant" size={44} color="#fff" />
        <Text style={styles.title}>Chef's Menu{'\n'}Manager</Text>
        <Text style={styles.tagline}>Manage your restaurant menu with ease.</Text>
      </View>

      <View style={styles.sheet}>
        <View style={styles.row}>
          <StatCard icon="restaurant" label="Total Dishes" value={String(total)} />
          <View style={{ width: 12 }} />
          <StatCard icon="ban" iconColor={COLORS.red} label="Unavailable" value={String(unavailable)} />
        </View>

        <Button title="Add Menu Item" icon="add" onPress={onAdd} style={styles.addBtn} />

        <Text style={styles.sectionTitle}>Menu Overview</Text>
        <View style={styles.panel}>
          <View style={styles.avgRow}>
            <Text style={styles.avgLabel}>Average price</Text>
            <Text style={styles.avgValue}>{total === 0 ? 'R0.00' : formatPrice(average)}</Text>
          </View>
          {perCourse.map(({ course, count }) => (
            <View key={course} style={styles.courseRow}>
              <Text style={styles.courseName}>{course}</Text>
              <View style={styles.track}>
                <View style={[styles.fill, { width: total ? `${(count / total) * 100}%` : '0%' }]} />
              </View>
              <Text style={styles.courseCount}>{count}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionRow}>
          <Text style={[styles.sectionTitle, { marginTop: 0, marginBottom: 0 }]}>Recent Activity</Text>
          <TouchableOpacity onPress={onViewAll}>
            <Text style={styles.viewAll}>View All →</Text>
          </TouchableOpacity>
        </View>
        {activity.length === 0 ? (
          <Text style={styles.empty}>No activity yet. Add your first dish to get started.</Text>
        ) : (
          activity.slice(0, 3).map((a) => {
            const icon = ACTIVITY_ICON[a.kind];
            return (
              <View key={a.id} style={styles.activity}>
                <Ionicons name={icon.name} size={34} color={icon.color} />
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={styles.activityName} numberOfLines={1}>{a.name}</Text>
                  <Text style={styles.activityTime}>
                    {a.kind[0].toUpperCase() + a.kind.slice(1)} • {a.time}
                  </Text>
                </View>
              </View>
            );
          })
        )}
        <View style={{ height: 24 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.navy },
  hero: { backgroundColor: COLORS.navy, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 56, overflow: 'hidden' },
  circleBig: { position: 'absolute', right: -60, top: -40, width: 220, height: 220, borderRadius: 110, backgroundColor: COLORS.navyLight, opacity: 0.6 },
  circleSmall: { position: 'absolute', right: 50, bottom: 10, width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.green, opacity: 0.25 },
  title: { fontSize: 32, fontWeight: '800', color: '#fff', marginTop: 12, lineHeight: 38 },
  tagline: { fontSize: 15, color: '#B9C4E4', marginTop: 10, maxWidth: 260 },
  sheet: { backgroundColor: COLORS.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, marginTop: -28, padding: 20 },
  row: { flexDirection: 'row' },
  addBtn: { marginTop: 16 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginTop: 24, marginBottom: 10 },
  viewAll: { fontSize: 14, fontWeight: '700', color: COLORS.green },
  panel: { backgroundColor: COLORS.card, borderRadius: 14, padding: 16, ...SHADOW },
  avgRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, marginBottom: 4, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  avgLabel: { fontSize: 15, color: COLORS.muted, fontWeight: '600' },
  avgValue: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  courseRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  courseName: { width: 96, fontSize: 14, fontWeight: '600', color: COLORS.text },
  track: { flex: 1, height: 10, borderRadius: 5, backgroundColor: '#E4E9F7', overflow: 'hidden', marginHorizontal: 10 },
  fill: { height: '100%', backgroundColor: COLORS.green, borderRadius: 5 },
  courseCount: { width: 26, textAlign: 'right', fontSize: 15, fontWeight: '800', color: COLORS.navy },
  activity: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 14, padding: 12, marginBottom: 10, ...SHADOW },
  activityName: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  activityTime: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  empty: { color: COLORS.muted, fontSize: 14 },
});
