import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet } from "react-native";

import all from './../client/list'

import Item from './../components/Item';

const List = ({ seila }) => {

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  
  useEffect(() => {
    all({pointOfSaleId: 1}).then(response => {
      setLoading(false);
      setList(response);
    })
  }, []);

  console.warn(list[0])
  return (
      <FlatList
        style={{ width: '100%'}}
        data={list}
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
  )
};

export default List;

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  item: {
    marginBottom: 10
  }
});