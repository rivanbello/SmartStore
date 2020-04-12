import React from 'react';
import { View, ScrollView, StyleSheet } from "react-native";

import Item from './../components/Item';

const List = ({ seila }) => (
  <ScrollView style={styles.container}>
    <Item style={styles.item} 
          description="Leite Tirol bla bla bla"
          category="Mercearia"
          price="R$ 38,50"/>
    <Item style={styles.item} 
          description="Pão Francês"
          category="Mercearia"
          price="R$ 40,50"/>
    <Item style={styles.item}
          description="Coca-Cola 2L"
          category="Bebidas"
          price="R$ 9,50"/>
  </ScrollView>
);

export default List;

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  item: {
    marginBottom: 10
  }
});