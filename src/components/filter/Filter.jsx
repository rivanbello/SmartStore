import React from 'react';
import { TextInput, StyleSheet, View } from "react-native";

const Filter = ({
  style,
  Icon,
  placeholder,
  value,
  focused,
  placeholderTextColor,
  onBlur = () => {},
  onFocus = () => {},
  onChangeText = () => {}
}) => (
    
    <View
      style={{...styles.container, ...style}}
    >
      <TextInput
        style={{ flex: 1 }}
        placeholder={placeholder}
        onFocus={() => onFocus()}
        value={value}
        autoFocus={focused}
        onChangeText={onChangeText}
        onBlur={() => onBlur()}
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
    paddingHorizontal: 22,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});