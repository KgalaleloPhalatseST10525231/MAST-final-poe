import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, COURSE_EMOJI } from '../constants/theme';

/** Shows the dish photo, or a course emoji placeholder when none was added. */
export default function DishImage({ uri, course, style, emojiSize = 32 }) {
  if (uri) return <Image source={{ uri }} style={[styles.fill, style]} resizeMode="cover" />;
  return (
    <View style={[styles.fill, styles.placeholder, style]}>
      <Text style={{ fontSize: emojiSize }}>{COURSE_EMOJI[course] || '🍽️'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { width: '100%', height: '100%' },
  placeholder: { backgroundColor: '#E4E9F7', alignItems: 'center', justifyContent: 'center' },
});
