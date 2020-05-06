import React from 'react';
import Item from './Item';
import { COLORS } from '../../constants';
import { Dimensions, ScrollView } from 'react-native';
import { Row } from '../layout';

const screenWidth = Math.round(Dimensions.get('window').width);
const FreeList = ({ list = []}) => {
  const rows = [];
  for (let i = 4; i < (list.length + 4); i = i + 4) {
    if (list.length >= i) rows.push(list.slice(i - 4, i));
    else rows.push(list.slice(i - 4, i - (i % list.length)))
  }
  return (
    <ScrollView style={styles.container}>
    {rows.map((row) => (
    <Row style={{ justifyContent: 'flex-start' }}>
    {row.map(({ description, price, quantity }) => (
      <Item
        style={styles.item}
        description={description}
        // category={category}
        price={price}
        qty={quantity}
        onPress={() => navigation.navigate('Product', {
          stock: quantity == 0 ? true : false,
          name: description,
          price,
          qty: quantity,
        })}
      />
    ))}
    </Row>
    ))}
  </ScrollView>
)}

const styles = {
  container: {
    paddingTop: 20,
  },
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

export default FreeList;