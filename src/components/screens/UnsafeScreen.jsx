import React from 'react';
import { View, ScrollView } from 'react-native';

const UnsafeScreen = ({ children, style, scrollview }) => (
  !scrollview ? <View style={{ 
    ...styles.container,
    ...style,
  }}>
    {children}
  </View>
  : <ScrollView style={{ 
    ...styles.container,
    ...style,
  }}>
    {children}
  </ScrollView>
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