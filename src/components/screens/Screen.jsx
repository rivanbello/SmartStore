import React from 'react';
import { View } from 'react-native';

const Screen = ({ children, style }) => (
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
    height: '100%',
    paddingHorizontal: 18,
  }
}

export default Screen;