import React from 'react';
import { View, Text, StyleSheet } from "react-native";

import Avatar from './../components/Avatar';

const Item = ({ img, description, category, qty, price, style }) => (
  <View style={{...styles.container, ...style}}>
    <Avatar/>
    <View style={styles.content}>
      <Text style={styles.description}>{ description }</Text>
      <Text style={styles.smallDescription}>{ category }</Text>
      <Text style={styles.smallDescription}>Quantidade: { qty }</Text>
      <Text style={styles.price}>{ price }</Text>
    </View>
  </View>
);

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    width: '100%',
    maxHeight: 110,
    padding: 7,
    borderRadius: 5
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  description: {
    fontSize: 17,
  },
  smallDescription: {
    fontSize: 14,
  },
  price: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: 20,
    fontWeight: "bold",   
  }
});