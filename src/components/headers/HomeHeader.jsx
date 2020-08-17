import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Row, Column } from '../layout';
import { HomeHeaderBackground } from '../../assets/images';
import { StackHeader } from '../headers';
import { CartContext } from '../../context';
import ShoppingBag from '../icons/ShoppingBag';

const HomeHeader = ({ navigation, name, condoName, searchActive = false, onBack }) => {
  
  const [cartInfo, setCartInfo] = useContext(CartContext);

  return (<View style={styles.container}>
    <Image source={HomeHeaderBackground} style={styles.image}/>
    {!searchActive ? 
      <Row style={
         styles.smallScreenLabel
      }>
        <Column style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ color: '#FFA5AD', fontSize: 17 }}>
              Olá
              <Text style={{ color: '#fff', fontWeight: 'bold' }}> {name}</Text>
            </Text>
            <Text style={styles.condoName}> {condoName} </Text>
          </Column>
          <View style={{ top: 15, position: 'absolute', right: 21 }}>
          {/* <ShoppingBag
            quantity={cartInfo.totalItems}
            handleOnPress={() => navigation.navigate('ShoppingBag')}
          /> */}
          </View>
        </Row>
    : <StackHeader
        style={styles.stackHeader}
        fontStyle={{ color: 'white' }}
        handleOnPress={() => navigation.navigate('ShoppingBag')}
        handleGoBack={() => onBack()}
        getBackFromSearch
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
    paddingTop: 10,
    top: 5,
    paddingHorizontal: 20,
  },
  regularLabel: {
    justifyContent: 'space-between',
    position: 'absolute',
    top: 25,
    paddingHorizontal: '5%',
    // left: 20,
  },
  condoName: {
    borderWidth: 1,
    // marginRight: 10,
    borderColor: 'white',
    textAlign: 'center',
    borderRadius: 16,
    paddingVertical: 3,
    paddingHorizontal: 4,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default HomeHeader;