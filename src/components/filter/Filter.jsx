import React from 'react';
import { TextInput, StyleSheet, View } from "react-native";

const Filter = ({ style, Icon, placeholder, placeholderTextColor }) => (
    
    <View
      style={{...styles.container, ...style}}
    >
        {Icon} 
      <TextInput
        placeholder={placeholder}
        style={{ marginLeft: 14 }}
        placeholderTextColor={placeholderTextColor}
      />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
});