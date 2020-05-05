import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import List from '../list/List';
import Filter from '../filter/Filter';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { HomeHeader } from '../headers';
import Screen from './Screen';

const HomeScreen = ({ route: { params = {} } = {}, navigation }) => {
  return (<>
  <HomeHeader />
    <Screen>
      <Filter
        style={styles.filter}
        placeholder="O que você está procurando?"
        placeholderTextColor={COLORS.darkestGray}
        Icon={<Ionicons name="ios-search" size={26} style={{ color: COLORS.primary }}/>}
      />
      <List navigation={navigation} />
    </Screen>
  </>)
};

const styles = StyleSheet.create({
  filter:{
    marginBottom: 20,
    width: '100%',
    fontSize: 14,
    shadowColor: "#000",
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    // shadowBlur: 10,
    shadowOpacity: 0.30,
    shadowRadius: 1.41,
    elevation: 10,
    color: COLORS.darkestGray,
    position: 'absolute',
    top: -25,
    left: 18,
  },
});

export default HomeScreen;