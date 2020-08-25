import React from 'react';
import { Platform, SafeAreaView, KeyboardAvoidingView } from 'react-native';

const Screen = ({ children, style }) => {
  return (
    Platform.OS === 'ios' ?
    <KeyboardAvoidingView
      behavior={'padding'}
      style={{ 
        ...styles.container,
        ...style,
      }}
    >
      {children}
    </KeyboardAvoidingView>
    : <SafeAreaView
    style={{ 
      ...styles.container,
      ...style,
    }}
  >
    {children}
  </SafeAreaView>
  )
};

const styles = {
  container: {
    width: '100%',
    paddingTop: 20,
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 18,
  }
}

export default Screen;