import React from 'react';
import { TextInput, StyleSheet, View } from "react-native";

const Filter = ({ style, Icon, placeholder, placeholderTextColor }) => (
    
    <View
      style={{...styles.container, ...style}}
    >
      <TextInput
        placeholder={placeholder}
        style={{ marginLeft: 14 }}
        placeholderTextColor={placeholderTextColor}
        />
        {Icon} 
    </View>
);

export default Filter;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 24,
    height: 50,
    width: '100%',
    paddingHorizontal: 14,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});