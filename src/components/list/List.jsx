import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

import all from '../../client/list'

import Item from './Item';

const List = ({ seila }) => {

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  
  useEffect(() => {
    all({pointOfSaleId: 1}).then(response => {
      setLoading(false);
      setList(response);
    })
  }, []);
  return (
    <View>
      <FlatList
        style={styles.container}
        horizontal
        data={list}
        contentContainerStyle={styles.content}
        keyExtractor={item => item.id}
        renderItem={({item: { description, categoryName, price, slots } = {}} ) => (
          <Item
            style={styles.item} 
            description={description}
            category={categoryName}
            price={price}
            qty={slots && slots[0].quantity}/>
        )}
      />
    </View>
  )
};

export default List;

const styles = StyleSheet.create({
  container: {
    // width: '100%',
  },
  item: {
    marginRight: (screenWidth - (74 * 4) - 40) / 3,
    // width: 100,
  }
});