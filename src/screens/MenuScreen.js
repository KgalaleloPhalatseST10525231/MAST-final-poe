import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import MenuListItem from '../components/MenuListItem';
import FilterChips from '../components/FilterChips';
import Button from '../components/Button';

export default function MenuScreen({
  items, visibleItems, searchText, courseFilter,
  onSearchChange, onCourseChange, onClearFilters, onOpenItem, onAdd,
}) {
  const isFiltering = !!searchText.trim() || !!courseFilter;

  const empty = items.length === 0 ? (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyEmoji}>🍽️</Text>
      <Text style={styles.emptyTitle}>No menu items yet</Text>
      <Text style={styles.emptyText}>Add your first dish to start building the menu.</Text>
      <Button title="Add Menu Item" icon="add" onPress={onAdd} style={{ alignSelf: 'stretch', marginTop: 16 }} />
    </View>
  ) : (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyEmoji}>🔍</Text>
      <Text style={styles.emptyTitle}>No matching dishes</Text>
      <Text style={styles.emptyText}>Try a different name or category, or clear the filters.</Text>
      <Button variant="outline" title="Clear filters" onPress={onClearFilters} style={{ alignSelf: 'stretch', marginTop: 16 }} />
    </View>
  );

  return (
    <View style={styles.screen}>
      <Header title="Menu" rightIcon="add-circle-outline" onRightPress={onAdd} />
      <View style={styles.sheet}>
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={20} color={COLORS.navy} />
          <TextInput
            style={styles.search}
            placeholder="Search dishes..."
            placeholderTextColor={COLORS.placeholder}
            value={searchText}
            onChangeText={onSearchChange}
            returnKeyType="search"
            autoCorrect={false}
          />
          {!!searchText && (
            <Ionicons name="close-circle" size={20} color={COLORS.muted} onPress={() => onSearchChange('')} />
          )}
        </View>
        <FilterChips value={courseFilter} onChange={onCourseChange} />

        <View style={styles.countRow}>
          <Text style={styles.count}>
            {isFiltering
              ? `Showing ${visibleItems.length} of ${items.length} dishes`
              : `${items.length} ${items.length === 1 ? 'dish' : 'dishes'}`}
          </Text>
          {isFiltering && (
            <Text style={styles.clear} onPress={onClearFilters} accessibilityRole="button">Clear filters</Text>
          )}
        </View>

        <FlatList
          data={visibleItems}
          keyExtractor={(i) => i.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={visibleItems.length === 0 ? styles.emptyContainer : { paddingBottom: 12 }}
          ListEmptyComponent={empty}
          renderItem={({ item }) => <MenuListItem item={item} onPress={onOpenItem} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.navy },
  sheet: { flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 16, paddingTop: 18 },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#E9EDF7',
    borderRadius: 14, paddingHorizontal: 14, marginBottom: 10,
  },
  search: { flex: 1, paddingVertical: 12, paddingHorizontal: 10, fontSize: 16, color: COLORS.text },
  countRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 10 },
  count: { fontSize: 13, color: COLORS.muted, fontWeight: '600' },
  clear: { fontSize: 13, fontWeight: '800', color: COLORS.green },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  emptyBox: { alignItems: 'center', padding: 24 },
  emptyEmoji: { fontSize: 44, marginBottom: 8 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 6 },
  emptyText: { fontSize: 15, color: COLORS.muted, textAlign: 'center' },
});
