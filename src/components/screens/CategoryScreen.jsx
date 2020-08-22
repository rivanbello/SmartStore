import React from 'react';
import Item from '../list/Item';
import { StackHeader } from '../headers';
import { COLORS, SCREEN_HEIGHT } from '../../constants';
import Screen from './Screen';
import { Row } from '../layout';
import { Dimensions, Text, VirtualizedList, FlatList } from 'react-native';

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
    <VirtualizedList
      data={rows}
      removeClippedSubviews
      keyExtractor={(item, index) => item + index}
      getItemCount={() => rows.length}
      initialNumToRender={4}
      getItem={(rows, i) => rows[i]}
      renderItem={({ item: row }) => (
        <Row style={{ justifyContent: 'flex-start' }}>
          <FlatList
            data={row}
            horizontal
            showsHorizontalScrollIndicator={false}
            // getItemCount={() => 4}
            // getItem={(items, i) => items[i]}
            // initialNumToRender={4}
            renderItem={({ item: { description, price, quantity, imageUrl, id, ageRestricted  }}) => <Item
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
            />}
          />
        </Row>
        )}
      />
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