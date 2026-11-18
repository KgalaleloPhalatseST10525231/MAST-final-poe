import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import { validateMenuItem, parsePrice } from '../utils/menu';
import Header from '../components/Header';
import FormField from '../components/FormField';
import CourseDropdown from '../components/CourseDropdown';
import ImagePickerBox from '../components/ImagePickerBox';
import Button from '../components/Button';

/** One form for both adding a new item and editing an existing one. */
export default function ItemFormScreen({ item, onSave, onCancel, onError }) {
  const isEditing = !!item;
  const [name, setName] = useState(item?.name ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [course, setCourse] = useState(item?.course ?? '');
  const [price, setPrice] = useState(item ? String(item.price) : '');
  const [available, setAvailable] = useState(item?.available ?? true);
  const [image, setImage] = useState(item?.image ?? null);
  const [errors, setErrors] = useState({});

  const clearError = (field) => setErrors((prev) => ({ ...prev, [field]: undefined }));

  const handleSave = () => {
    const found = validateMenuItem({ name, description, course, price });
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSave({
      name: name.trim(),
      description: description.trim(),
      course,
      price: parsePrice(price),
      available,
      image,
    });
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <View style={styles.screen}>
      <Header title={isEditing ? 'Edit Menu Item' : 'Add Menu Item'} onBack={onCancel} centered />
      <KeyboardAvoidingView style={styles.sheet} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {hasErrors && (
            <View style={styles.errorSummary}>
              <Text style={styles.errorSummaryText}>Please fix the highlighted fields before saving.</Text>
            </View>
          )}

          <ImagePickerBox uri={image} onChange={setImage} onError={onError} />

          <FormField
            label="Dish Name" required placeholder="e.g. Margherita Pizza"
            value={name} onChangeText={(t) => { setName(t); clearError('name'); }} error={errors.name}
          />
          <FormField
            label="Description" required multiline placeholder="Describe the dish..."
            value={description} onChangeText={(t) => { setDescription(t); clearError('description'); }} error={errors.description}
          />
          <CourseDropdown value={course} onChange={(c) => { setCourse(c); clearError('course'); }} error={errors.course} />
          <FormField
            label="Price (R)" required placeholder="e.g. 89.00" keyboardType="decimal-pad"
            value={price} onChangeText={(t) => { setPrice(t); clearError('price'); }} error={errors.price}
          />

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Availability</Text>
              <Text style={styles.switchHint}>{available ? 'Shown as available' : 'Shown as unavailable'}</Text>
            </View>
            <Switch
              value={available}
              onValueChange={setAvailable}
              trackColor={{ false: COLORS.border, true: COLORS.green }}
              thumbColor="#fff"
            />
          </View>

          <Button
            icon="save-outline"
            title={isEditing ? 'Save Changes' : 'Save Item'}
            onPress={handleSave}
            style={{ marginTop: 20 }}
          />
          <Button variant="outline" title="Cancel" onPress={onCancel} style={{ marginTop: 10, marginBottom: 20 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.navy },
  sheet: { flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  content: { padding: 20 },
  errorSummary: { backgroundColor: COLORS.redLight, borderColor: COLORS.red, borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 14 },
  errorSummaryText: { color: COLORS.red, fontWeight: '700', fontSize: 14 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 },
  switchLabel: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  switchHint: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
});
