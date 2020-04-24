import React from 'react';
import { Row } from '../layout';
import { TextInput, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const FormItem = ({ Icon, style, placeholder, active = false }) => (
  <Row style={{
    ...styles.container,
    ...style,
    borderColor: active ? COLORS.primary : COLORS.gray,
  }}>
    <Icon.component
      name={Icon.name}
      size={Icon.size}
      style={active ? styles.iconActive : styles.icon}
    />
    <Text 
      style={active && styles.floatingPlaceholder || styles.placeholder}>
      {placeholder}
    </Text>
    <TextInput
      style={{
        ...styles.input,
      }}
      placeholderTextColor={COLORS.gray}
    />
  {/* } */}
    
  </Row>
);

const styles = StyleSheet.create({
  container: {
    // padding: 5,
    borderBottomWidth: 1,
    borderRadius: 5,
  },
  input: {
    marginLeft: 14,
    flex: 1,
  },
  icon: {
    color: COLORS.darkGray,
  },
  iconActive: {
    color: COLORS.primary,
  },
  placeholder: {
    position: 'absolute',
    color: COLORS.darkGray,
    left: 30,
  },
  floatingPlaceholder: {
    position: 'absolute',
    color: COLORS.darkGray,
    left: 0,
    bottom: 30,
    fontSize: 10,
  }
});

export default FormItem;