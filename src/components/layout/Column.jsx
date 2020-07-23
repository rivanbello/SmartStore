import React from 'react';
import { View, StyleSheet } from 'react-native';

const Column = ({ style, children }) => (
  <View style={{ ...styles.container, ...style }}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Column;