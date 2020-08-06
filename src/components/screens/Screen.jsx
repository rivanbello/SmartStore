import React from 'react';
import { SafeAreaView } from 'react-native';

const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={{ 
      ...styles.container,
      ...style,
    }}>
      {children}
    </SafeAreaView>
  )
};

const styles = {
  container: {
    width: '100%',
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 18,
  }
}

export default Screen;