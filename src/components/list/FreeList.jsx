import React from 'react';
import Item from './Item';
import { COLORS } from '../../constants';
import { Dimensions, FlatList } from 'react-native';
import { Row } from '../layout';

const screenWidth = Math.round(Dimensions.get('window').width);
const FreeList = ({ list = [], navigation }) => {
  const rows = [];
  for (let i = 4; i < (list.length + 4); i = i + 4) {
    if (list.length >= i) rows.push(list.slice(i - 4, i));
    else rows.push(list.slice(i - 4, i - (i % list.length)))
  }
  return (
    <FlatList style={styles.container}
      data={rows}
      keyExtractor={(item, index) => `${item}${index}`}
      renderItem={({ item: row }) => (
        <Row style={{ justifyContent: 'flex-start' }}>
          {row.map(({ description, price, quantity, imageUrl, ageRestricted, id }, index) => (
            <Item
              style={styles.item}
              key={`${description}${index}`}
              description={description}
              img={imageUrl}
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
    )}
  />
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