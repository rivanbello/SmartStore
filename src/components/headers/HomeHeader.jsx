import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Row } from '../layout';
import { HomeHeaderBackground } from '../../assets/images';
import { StackHeader } from '../headers';

const HomeHeader = ({ balance, name = 'Nome', condoName, searchActive = false, setSearchActive = (() => {}) }) => (
  <View style={styles.container}>
    <Image source={HomeHeaderBackground} style={styles.image}/>
    {!searchActive ? 
      <Row style={styles.label}>
        <Text style={{ color: '#FFA5AD', fontSize: 20 }}>
          Olá
          <Text style={{ color: '#fff', fontWeight: 'bold' }}> {name}</Text>
        </Text>
        <Text style={styles.condoName}> {condoName} </Text>
      </Row>
    : <StackHeader
        style={styles.stackHeader}
        fontStyle={{ color: 'white' }}
        onPress={() => setSearchActive(false)}
      />
    }
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  stackHeader: {
    position: 'absolute',
    top: '10%',
    left: 20,
    color: 'white',
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
    borderRadius: 16,
    paddingVertical: 3,
    paddingHorizontal: 4,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default HomeHeader;