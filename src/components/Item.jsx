import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import Avatar from './../components/Avatar';
import { COLORS } from '../constants';

const Item = ({ img, description, category, qty, price, style }) => (
  <View style={{...styles.container, ...style}}>
    <View style={styles.content}>
      <Avatar/>
      <Text style={styles.price}>R$ {price.toFixed(2).replace('.', ',')}</Text>
      <Text style={styles.description} numberOfLines={2}>{description}</Text>
      <Text style={styles.quantity}>{qty}un</Text>
    </View>
  </View>
);

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 74,
    maxHeight: 250,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  description: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    // whiteSpace: 'nowrap',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
  },
  quantity: {
    fontSize: 12,
    color: COLORS.lightGray,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  }
});