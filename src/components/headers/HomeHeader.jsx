import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Row } from '../layout';
import { HomeHeaderBackground } from '../../assets/images';
import { StackHeader } from '../headers';
import { SCREEN_WIDTH } from '../../constants';
import { UserContext } from '../../context';
import ShoppingBag from '../icons/ShoppingBag';

const HomeHeader = ({ balance, name, condoName, searchActive = false, setSearchActive = (() => {}) }) => {
  
  const [userInfo, setUserInfo] = useContext(UserContext);

  return (<View style={styles.container}>
    <Image source={HomeHeaderBackground} style={styles.image}/>
    {!searchActive ? 
      <Row style={
        SCREEN_WIDTH > 340
        ? styles.regularLabel
        : styles.smallScreenLabel
      }>
        {console.warn(userInfo)}
        <Text style={{ color: '#FFA5AD', fontSize: 20 }}>
          Olá
          <Text style={{ color: '#fff', fontWeight: 'bold' }}> {name}</Text>
        </Text>
        <Row>
          <Text style={styles.condoName}> {condoName} </Text>
          <ShoppingBag
            // quantity={userInfo.cart.items.length}
            quantity={2}
          />
        </Row>
      </Row>
    : <StackHeader
        style={styles.stackHeader}
        fontStyle={{ color: 'white' }}
        onPress={() => setSearchActive(false)}
      />
    }
  </View>)
};

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
  smallScreenLabel: {
    justifyContent: 'space-between',
    position: 'absolute',
    flexDirection: 'column',
    top: 5,
    paddingHorizontal: 20,
  },
  regularLabel: {
    justifyContent: 'space-between',
    position: 'absolute',
    top: 30,
    paddingHorizontal: 20,
    // left: 20,
  },
  condoName: {
    borderWidth: 1,
    marginRight: 10,
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