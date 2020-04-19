import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DoubleLabelButton } from '../buttons';

const HomeHeader = ({ username, balance }) => (
  <View style={styles.container}>
    <DoubleLabelButton
      labels={["Saldo Atual", `R$ ${balance || '0,00'}`]}
      Icon={<Ionicons name={"ios-arrow"}/>}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {

  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default HomeHeader;