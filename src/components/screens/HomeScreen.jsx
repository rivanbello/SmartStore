import React from 'react';
import { StyleSheet, View } from 'react-native';
import List from '../list/List';
import Filter from '../filter/Filter';

const HomeScreen = () => (
  <View style={styles.container}>
    <Filter style={styles.filter}/>
    <List/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  filter:{
    marginBottom: 20,
    width: '100%',
  },
});

export default HomeScreen;