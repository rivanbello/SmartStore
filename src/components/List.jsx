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

  return (
      <FlatList 
        data={list}
        keyExtractor={item => item.id}
        renderItem={(item) => (
          <Item 
              style={styles.item} 
              description={item.description}
              category={item.categoryName}
              price={item.price}
              qty={item.price}/>
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