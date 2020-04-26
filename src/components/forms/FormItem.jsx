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
            toValue: -12,
            duration: 150,
        },
        {
          position: labelFontSize,
          toValue: 10,
          duration: 150,
        }
    ])
    } else {
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
          // style={active && styles.floatingPlaceholder || styles.placeholder}
          style={{
            left: labelXPosition,
            top: labelYPosition,
            position: 'absolute'
          }}
        >
        <Animated.Text
          style={{ fontSize: labelFontSize }}
        >
          {placeholder}
        </Animated.Text>
      </Animated.View>
      <TextInput
        style={{
          ...styles.input,
        }}
        onFocus={() => setActive(true)}
        onBlur={() => !inputHasContent && setActive(false)}
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
    color: COLORS.darkGray,
  },
  iconActive: {
    color: COLORS.primary,
  },
  placeholderView: {
    left: 30,
  },
  placeholder: {
    position: 'absolute',
    color: COLORS.gray,
    fontSize: 16,
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