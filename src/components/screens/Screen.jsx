import React from 'react';
import { SafeAreaView } from 'react-native';

const Screen = ({ children, style }) => (
  <SafeAreaView style={{ 
    ...styles.container,
    ...style,
  }}>
    {children}
  </SafeAreaView>
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

export default Screen;