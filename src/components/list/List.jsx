import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import all from '../../client/list'
import ListHeader from './ListHeader';
import Item from './Item';

const screenWidth = Math.round(Dimensions.get('window').width);

const List = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  
  useEffect(() => {
    all({ pointOfSaleId: 1 }).then(response => {
      setLoading(false);
      setList(response);
    })
  }, []);
  return (
    <View style={styles.container}>
      <ListHeader label="Bebidas" expandLabel="Ver tudo" style={styles.header}/>
      <FlatList
        // style={styles.container}
        horizontal
        data={list.slice(0, 10)}
        // contentContainerStyle={styles.content}
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
    marginTop: 30,
  },
  header: {
    marginBottom: 16,
  },
  item: {
    marginRight: (screenWidth - (74 * 4) - 40) / 3,
  }
});