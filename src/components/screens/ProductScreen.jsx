import React, { useState, useContext, useEffect, useRef } from 'react';
// import { Image } from 'react-native';
import { Text, Image, View, ScrollView } from 'react-native';
import UnsafeScreen from './UnsafeScreen';
import { Row } from '../layout';
import { COLORS } from '../../constants';
import { StackHeader } from '../headers';
import Spinner from '../misc/Spinner';
import { PrimaryButton } from '../buttons';
import * as ImageManipulator from 'expo-image-manipulator';
import { CartContext } from '../../context';

const ProductScreen = ({ route: { params = {} } = {}, navigation, state }) => {
  const {
    imageUrl,
    stock = false,
    name,
    price,
    qty: stockQty,
    ageRestricted,
    id,
  } = params;

  const [imgSrc, setImgSrc] = useState(null);
  const [qtyToAdd, setQtyToAdd] = useState(1);

  useEffect(() => {
    ImageManipulator.manipulateAsync(imageUrl, [{
      resize: {
        height: 145,
      }},
    ],
    {
      compress: 0.4
    },
    ).then(({ uri }) => setImgSrc(uri));
  }, [])
  
  const [qtyInCart, setQtyInCart] = useState(0);
  const [cartInfo, setCartInfo] = useContext(CartContext);
  const addToCart = () => {
    const itemToAdd = {
        imageUrl,
        name,
        price,
        stockQty,
        qty: qtyToAdd,
        ageRestricted,
        id,
      };
    let itemsUpdated = cartInfo.items;
    let index = undefined;
    let updatedQty = qtyToAdd;
    itemsUpdated.forEach((item, i) => { if(item.id === id) { index = i; updatedQty += item.qty }})
    if (index != undefined) itemsUpdated[index] = { ...itemToAdd, qty: updatedQty }
    else itemsUpdated = itemsUpdated.concat(itemToAdd);
    const totalItems = itemsUpdated.reduce((a, { qty: b }) => a + b, 0);
    setCartInfo({
        ...cartInfo,
        items: itemsUpdated,
        totalItems,
    });
    setCartInfo({
      cartInfo,
      items: itemsUpdated,
      totalItems,
    })
  };
  
  useEffect(() => {
    const item = cartInfo.items.filter(({ id: storedId }) => storedId === id)[0];
    if (item) setQtyInCart(item.qty);
    else setQtyInCart(0);
    if (item && (qtyToAdd > (stockQty - qtyInCart))) setQtyToAdd(stockQty - item.qty)
  }, [cartInfo.totalItems])
  
  return (
  <UnsafeScreen>
    <StackHeader 
      handleGoBack={() => navigation.goBack()}
      handleOnPress={() => navigation.navigate('ShoppingBag')}
    />
    <ScrollView>
    <Row style={styles.imageBackground}>
      <Image style={styles.image} source={imgSrc ? {uri: imgSrc} : null} />
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
        {Number(stockQty) < 9 ? '0' : ''}{stockQty}un
      </Text>
    </Row>
    <Text style={ageRestricted ? styles.ageRestrictedPrice : styles.regularPrice}>R$ {price && price.toFixed(2).replace('.', ',')}</Text>
    {ageRestricted && <View style={{ color: COLORS.gray, borderTopWidth: 0.5, marginTop: 20 }}/>}
    {ageRestricted && <Row style={{ justifyContent: 'flex-start' }}>
      <View style={styles.ageRestrictedLabel}><Text style={{ color: '#fff', fontSize: 20 }}>+18</Text></View>
      <Text style={{ color: COLORS.darkGray, maxWidth: '70%' }}>Produto autorizado somente para maiores de 18 anos</Text>
    </Row>}
    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
      {/* {stockQty > 0 && qtyInCart !== stockQty
      && <Spinner stockQty={stockQty - qtyInCart} value={qtyToAdd} setValue={(value) => setQtyToAdd(value) }/> }
      <PrimaryButton
        disabled={stockQty <= 0 || qtyInCart === stockQty}
        label={stockQty <= 0 ? "Fora de estoque"
          : qtyInCart === stockQty
            ? 'Você adicionou todo estoque'
            : 'Adicionar à sacola'
      }
        onPress={() => {
          addToCart(qtyToAdd);
          setQtyInCart(qtyInCart + qtyToAdd);
        }}
      /> */}
    </View>
    </ScrollView>
  </UnsafeScreen>)
};

const styles = {
  imageBackground: {
    height: '38%',
    marginBottom: 40,
  },
  image: {
    resizeMode: 'contain',
    height: 145,
    width: 145,
  },
  ageRestrictedLabel: {
    backgroundColor: '#000',
    padding: 2,
    paddingHorizontal: 4,
    borderRadius: 5,
    marginRight: 10,
    color: 'white'
  },
  ageRestrictedPrice: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.gray,
    fontStyle: 'italic',
    marginTop: '5%'
  },
  title: {
    color: COLORS.fontPrimary,
    fontWeight: 'bold',
    fontSize: 24,
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