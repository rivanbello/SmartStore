import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HomeScreen, LoginScreen } from './src/components/screens/';
require('./src/firebase');

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 20
  },
});