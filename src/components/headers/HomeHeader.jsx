import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Row } from '../layout';
import { HomeHeaderBackground } from '../../assets/images';
import Filter from '../filter/Filter';

const HomeHeader = ({ balance, name = 'Nome', condoName }) => (
  <View style={styles.container}>
    <Image source={HomeHeaderBackground} style={styles.image}/>
    <Row style={styles.label}>
      <Text style={{ color: '#FFA5AD', fontSize: 20 }}>
        Olá
        <Text style={{ color: '#fff', fontWeight: 'bold' }}> {name}</Text>
      </Text>
      <Text style={styles.condoName}>{condoName}</Text>
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
    justifyContent: 'space-between',
    position: 'absolute',
    top: 40,
    paddingHorizontal: 20,
    // left: 20,
  },
  condoName: {
    borderWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 4,
    color: 'white',
    fontWeight: 'bold',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default HomeHeader;