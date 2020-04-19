import React from 'react';
import { StyleSheet, View } from 'react-native';
import List from '../list/List';
import Filter from '../filter/Filter';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';

const HomeScreen = () => (
  <View style={styles.container}>
    <Filter
      style={styles.filter}
      placeholder="O que você está procurando?"
      placeholderTextColor={COLORS.darkGray}
      Icon={<Ionicons name="ios-search" size={26} style={{ color: COLORS.primary }}/>}
    />
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
    fontSize: 14,
    backgroundColor: COLORS.lightGray,
    color: COLORS.darkGray,
    borderWidth: 0,
    borderRadius: 12,
  },
});

export default HomeScreen;