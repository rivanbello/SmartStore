import React from 'react';
import { View, StyleSheet } from 'react-native';

const Row = ({ style, children }) => (
  Array.isArray(style)
  ? <View style={[styles.container, ...style]}>
    {children}
  </View>
  : <View style={{ ...styles.container, ...style }}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Row;