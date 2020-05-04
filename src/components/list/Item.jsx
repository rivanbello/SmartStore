import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Avatar from '../list/Avatar';
import { COLORS } from '../../constants';

const Item = ({ img, description, qty, price, style }) => (
  <TouchableOpacity style={{...styles.container, ...style}}>
    <View style={styles.content}>
      <Avatar style={styles.avatar} src={img}/>
      <Text style={{ ...styles.price, ...styles.text }}>R$ {price.toFixed(2).replace('.', ',')}</Text>
      <Text style={{ ...styles.description, ...styles.text }} numberOfLines={2}>{description}</Text>
      <Text style={{ ...styles.quantity, ...styles.text }}>
        {Number(qty) < 9 ? '0' : ''}{qty}un
      </Text>
    </View>
  </TouchableOpacity>
);

export default Item;

const styles = StyleSheet.create({
  avatar: {
    marginBottom: 9,
  },
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
    color: COLORS.darkestGray,
  },
  quantity: {
    fontSize: 12,
    color: COLORS.lilac,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  text: {
    marginLeft: 5,
  }
});