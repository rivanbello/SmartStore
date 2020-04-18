import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import List from './src/components/List';
import Filter from './src/components/Filter';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Filter style={styles.filter}/>
      <List/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:50,
    paddingHorizontal: 20
  },
  filter:{
    marginBottom: 20
  }
});
