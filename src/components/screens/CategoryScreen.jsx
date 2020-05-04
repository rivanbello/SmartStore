import React from 'react';
import Item from '../list/Item';
import { StackHeader } from '../headers';
import Screen from './Screen';
import { Dimensions, FlatList } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

const CategoryScreen = ({ 
  categoryName,
  data,
  list = [],
}) => (
  <Screen>
    <FlatList
      data={
        list
          .filter(({ categoryId, categoryName}) => 
            category === `Categoria ${categoryId}`
            || category === categoryName
          )
        .slice(0, 10)}
      // contentContainerStyle={styles.content}
      keyExtractor={item => item.id}
      renderItem={({ item: { description, categoryName, price, quantity } = {}} ) => (
        <Item
          style={styles.item} 
          description={description}
          category={categoryName}
          price={price}
          qty={quantity}/>
      )}
    />
  </Screen>
);

const styles = {
  item: {
    marginRight: (screenWidth - (74 * 4) - 40) / 3,
  },
}

export default CategoryScreen;