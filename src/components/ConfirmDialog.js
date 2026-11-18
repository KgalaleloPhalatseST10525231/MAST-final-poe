import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import Button from './Button';

/** Cross-platform confirmation dialog (Alert.alert buttons don't work on web). */
export default function ConfirmDialog({ visible, title, message, confirmLabel, onConfirm, onCancel }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.row}>
            <Button variant="outline" title="Cancel" onPress={onCancel} style={styles.btn} />
            <View style={{ width: 10 }} />
            <Button variant="danger" title={confirmLabel} onPress={onConfirm} style={styles.btn} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(14,31,77,0.55)', justifyContent: 'center', padding: 24 },
  dialog: { backgroundColor: COLORS.card, borderRadius: 16, padding: 20 },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  message: { fontSize: 15, color: COLORS.muted, lineHeight: 21, marginBottom: 18 },
  row: { flexDirection: 'row' },
  btn: { flex: 1, paddingVertical: 12 },
});
