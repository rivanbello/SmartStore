import React from 'react';
// import { Image } from 'react-native';
import { Text, Image } from 'react-native';
import UnsafeScreen from './UnsafeScreen';
import { Row } from '../layout';
import { COLORS } from '../../constants';
import { StackHeader } from '../headers';

const ProductScreen = ({ route: { params = {} } = {}, navigation }) => {
  const {
    imageUrl,
    adult = false,
    stock = false,
    name,
    price,
    qty,
  } = params;
  return (
  <UnsafeScreen>
    <StackHeader onPress={() => navigation.goBack()} />
    <Row style={styles.imageBackground}>
      <Image style={styles.image} source={imageUrl ? {uri: imageUrl} : null} />
      {stock ? 
      <Text style=
      {{ ...styles.stockLabel, ...styles.onStockLabel }}>Em estoque!</Text>
      : <Text style=
      {{ ...styles.stockLabel, ...styles.noStockLabel }}>Esgotado</Text>
    }
    </Row>
    <Row style={{ justifyContent: 'space-between' }}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.quantity}>
        {Number(qty) < 9 ? '0' : ''}{qty}un   
      </Text>
    </Row>
    {!adult && <Text style={styles.regularPrice}>R$ {price && price.toFixed(2).replace('.', ',')}</Text>}
  </UnsafeScreen>)
};

const styles = {
  imageBackground: {
    height: '40%',
    marginBottom: 40,
  },
  image: {
    height: 190,
    width: 190,
  },
  title: {
    color: COLORS.fontPrimary,
    textWeight: 'bold',
    fontSize: 26,
    maxWidth: '80%'
  },
  regularPrice: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  quantity: {
    fontSize: 18,
    color: COLORS.lilac,
  },
  stockLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 5,
    padding: 7,
    position: 'absolute',
    left: 0,
    bottom: 5,
  },
  onStockLabel: {
    color: COLORS.primary,
    backgroundColor: COLORS.salmon,
  },
  noStockLabel: {
    backgroundColor: COLORS.primary,
    color: 'white',
  }
}

export default ProductScreen;