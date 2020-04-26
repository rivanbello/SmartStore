import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
} from './src/components/screens';
require('./src/firebase');

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <LoginScreen /> */}
      {/* <HomeScreen /> */}
      <RegisterScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
  },
});