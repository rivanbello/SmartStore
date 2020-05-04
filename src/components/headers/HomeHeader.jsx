import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Row } from '../layout';
import { HomeHeaderBackground } from '../../assets/images';
import Filter from '../filter/Filter';

const HomeHeader = ({ balance, name = 'Nome' }) => (
  <View style={styles.container}>
    <Image source={HomeHeaderBackground} style={styles.image}/>
    <Row style={styles.label}>
      <Text style={{ color: '#FFA5AD', fontSize: 20 }}>
        Olá
        <Text style={{ color: '#fff', fontWeight: 'bold' }}> {name}</Text>
      </Text>
    </Row>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    // flex: 1,
    // position: 'absolute',
    // top: -18,
  },
  label: {
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 40,
    left: 20,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default HomeHeader;