import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import List from '../list/List';
import Filter from '../filter/Filter';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { HomeHeader } from '../headers';
import Screen from './Screen';

const HomeScreen = () => (
    <>
    <HomeHeader />
      <Screen>
        <Filter
          style={styles.filter}
          placeholder="O que você está procurando?"
          placeholderTextColor={COLORS.darkestGray}
          Icon={<Ionicons name="ios-search" size={26} style={{ color: COLORS.primary }}/>}
        />
        <List />
      </Screen>
    </>
);

const styles = StyleSheet.create({
  filter:{
    marginBottom: 20,
    width: '100%',
    fontSize: 14,
    backgroundColor: COLORS.lightGray,
    color: COLORS.darkestGray,
    borderWidth: 0,
    borderRadius: 12,
    position: 'absolute',
    top: -25,
    left: 18,
  },
});

export default HomeScreen;