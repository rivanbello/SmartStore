import React, { useState, useEffect } from 'react';
import { Row } from '../layout';
import { Animated, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import { floatingLabel } from './animations';

const FormItem = ({ Icon, style, placeholder }) => {

  const [active, setActive] = useState(false);
  const [labelXPosition] = useState(new Animated.Value(10));
  const [labelYPosition] = useState(new Animated.Value(0));
  const [labelFontSize] = useState(new Animated.Value(14));
  const [inputHasContent, setInputHasContent] = useState(false);

  useEffect(() => {
    if (active) {
      floatingLabel([
        {
          position: labelXPosition,
          toValue: 0,
          duration: 150,
        },
        {
          position: labelYPosition,
            toValue: -14,
            duration: 150,
        },
        {
          position: labelFontSize,
          toValue: 10,
          duration: 150,
        }
    ])
    } else if (!inputHasContent) {
      floatingLabel([
        {
          position: labelXPosition,
          toValue:  34,
          duration: 150,
        },
        {
          position: labelYPosition,
          toValue:  5,
          duration: 150,
        },
        {
          position: labelFontSize,
          toValue:  14,
          duration: 150,
        }
      ]);
    }
  }, [active]);

  return (
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
      <Animated.View
          style={{
            left: labelXPosition,
            top: labelYPosition,
            position: 'absolute'
          }}
        >
        <Animated.Text
          style={{
            fontSize: labelFontSize,
            color: active ? COLORS.darkestGray : COLORS.gray,
           }}
        >
          {placeholder}
        </Animated.Text>
      </Animated.View>
      <TextInput
        style={{
          ...styles.input,
        }}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChangeText={
          (text) => text.length > 0
          ? setInputHasContent(true)
          : setInputHasContent(false)
        }
      />
      
    </Row>
  );
}
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
    color: COLORS.gray,
  },
  iconActive: {
    color: COLORS.primary,
  },
  placeholderView: {
    left: 30,
  },
});

export default FormItem;