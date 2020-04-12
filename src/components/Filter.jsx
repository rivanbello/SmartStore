import React from 'react';
import { TextInput, StyleSheet } from "react-native";

const Filter = ({ style }) => (
  <TextInput style={{...styles.container, ...style}} placeholder= "Pesquisar produto">
  </TextInput>
);

export default Filter;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
    width: '100%',
  },
});