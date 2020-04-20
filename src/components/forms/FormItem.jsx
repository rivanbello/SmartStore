import React from 'react';
import { Row } from '../layout';
import { TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const FormItem = ({ Icon, style, placeholder, active = false }) => (
  <Row style={{
    ...styles.container,
    ...style,
    borderColor: active ? COLORS.primary : COLORS.gray,
  }}>
    {Icon}
    {active ?
    <Text style={styles.floatingPlaceholder}>{placeholder}</Text>
    <TextInput
      style={{
        ...styles.input,
      }}
      placeholderTextColor={COLORS.gray}
    />
  }
    
  </Row>
);

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  input: {
    marginLeft: 14,
    flex: 1,
  },
  floatingPlaceholder: {
    position: 'absolute',
  }
});

export default FormItem;