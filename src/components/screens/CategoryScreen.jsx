import React from 'react';
import Item from '../list/Item';
import { StackHeader } from '../headers';
import { COLORS } from '../../constants';
import Screen from './Screen';
import { Row } from '../layout';
import { Dimensions, Text, ScrollView } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

const CategoryScreen = ({ route, navigation, state }) => {
  const list = Array.isArray(route.params.list)
  //displaying all products in random order
    && route.params.list.sort(() => Math.random() > 0.5)  
    //placing all products with 0 quantity to the end
    .sort((a = {}, b = {}) => a.quantity === 0)
  || [];
  const category = route.params.category || '';
  let rows = [];
  for (let i = 4; i < (list.length + 4); i = i + 4) {
    if (list.length >= i) rows.push(list.slice(i - 4, i));
    else rows.push(list.slice(i - 4, i - (i % list.length)))
  }
  return (
  <Screen>
    <StackHeader
      handleGoBack={() => navigation.goBack()}
      handleOnPress={() => navigation.navigate('ShoppingBag')}
    />
    <Text style={styles.title}>{category}</Text>
    <ScrollView>
    {rows.map((row) => (
      <Row style={{ justifyContent: 'flex-start' }}>
        {row.map(({ description, price, quantity, imageUrl, id, ageRestricted  }) => (
          <Item
            img={imageUrl}
            style={styles.item}
            description={description}
            // category={category}
            price={price}
            qty={quantity}
            onPress={() => navigation.navigate('Product', {
              stock: quantity == 0 ? false : true,
              name: description,
              price,
              ageRestricted,
              qty: quantity,
              imageUrl,
              id,
            })}
          />
        ))}
      </Row>
    ))}
    </ScrollView>
  </Screen>)
};

const styles = {
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    color: COLORS.primary,
    marginTop: '8%',
    marginBottom: '4%',
  },
  item: {
    marginRight: (screenWidth - (74 * 4) - 40) / 3,
    marginBottom: '2%',
  },
}

export default CategoryScreen;