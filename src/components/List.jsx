import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from "react-native";

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
    <ScrollView style={styles.container}>
      {list.map(({id, description, categoryName, price, slots}) => (
        <Item key={id} 
              style={styles.item} 
              description={description}
              category={categoryName}
              price={price}
              qty={slots[0].quantity}/>
        ))
      }
    </ScrollView>
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