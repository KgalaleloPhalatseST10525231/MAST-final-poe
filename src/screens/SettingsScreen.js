import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { COLORS, COURSES } from '../constants/theme';
import Header from '../components/Header';
import SettingsCard from '../components/SettingsRow';
import Button from '../components/Button';

export default function SettingsScreen({ itemCount, onClearMenu }) {
  return (
    <View style={styles.screen}>
      <Header title="Settings" subtitle="Manage your restaurant settings" />
      <ScrollView style={styles.sheet} contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <SettingsCard icon="storefront-outline" title="Restaurant Info" lines={["The Taste House", "123 Foodie Street, Cape Town"]} />
        <SettingsCard icon="restaurant-outline" title="Menu Preferences" lines={[`Categories: ${COURSES.join(', ')}`, `${itemCount} ${itemCount === 1 ? 'dish' : 'dishes'} on the menu`]} />
        <SettingsCard icon="information-circle-outline" title="About" lines={['App Version 1.0.0']} />
        {itemCount > 0 && (
          <Button variant="danger" icon="trash-outline" title="Clear Entire Menu" onPress={onClearMenu} style={{ marginTop: 8 }} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.navy },
  sheet: { flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
});
