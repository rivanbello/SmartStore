import React from 'react';
import { View } from 'react-native';

const UnsafeScreen = ({ children, style }) => (
  <View style={{ 
    ...styles.container,
    ...style,
  }}>
    {children}
  </View>
);

const styles = {
  container: {
    width: '100%',
    paddingTop: 25,
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 18,
  }
}

export default UnsafeScreen;