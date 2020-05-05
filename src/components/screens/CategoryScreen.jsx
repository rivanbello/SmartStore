import React from 'react';
import Item from '../list/Item';
import { StackHeader } from '../headers';
import Screen from './Screen';
import { Row } from '../layout';
import { Dimensions, FlatList } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

const CategoryScreen = ({ route, navigation }) => {
  const list = route.params.list || [];
  const category = route.params.category || '';
  let rows = [];
  for (let i = 4; i < list.length; i = i + 4) rows.push(list.slice(i - 4, i));
  return (
  <Screen>
    {rows.map((row) => (
      <Row>
        {row.map(({ description, price, quantity }) => (
          <Item
            style={styles.item} 
            description={description}
            // category={category}
            price={price}
            qty={quantity}
          />
        ))}
      </Row>
    ))}
  </Screen>)
};

const styles = {
  item: {
    marginRight: (screenWidth - (74 * 4) - 40) / 3,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    // overFlow: 'hidden'
    // flex: 1,
    // maxWidth: '100%'
  },
}

export default CategoryScreen;