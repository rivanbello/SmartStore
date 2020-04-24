import React, { useState, useEffect } from 'react';
import { Row } from '../layout';
import { Animated, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const FormItem = ({ Icon, style, placeholder}) => {
  
  const [active, setActive] = useState(false);
  const [labelXPosition] = useState(new Animated.Value(10));
  const [labelYPosition] = useState(new Animated.Value(0));
  const [labelFontSize] = useState(new Animated.Value(14));

  useEffect(() => {
    if (active) {
      Animated.timing(labelXPosition, {
        toValue: -20,
        duration: 500,
      }).start();
      Animated.timing(labelYPosition, {
        toValue: -20,
        duration: 500,
      }).start();
      Animated.timing(labelFontSize, {
        toValue: 10,
        duration: 500,
      }).start();
    } else {
      Animated.timing(labelXPosition, {
        toValue: -20,
        duration: 500,
      }).start();
      Animated.timing(labelYPosition, {
        toValue: -20,
        duration: 500,
      }).start();
      Animated.timing(labelFontSize, {
        toValue: 10,
        duration: 500,
      }).start();
    }
  }, []);

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
        onBlur={() => setActive(false)}
        placeholderTextColor={COLORS.gray}
      />
    {/* } */}
      
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
    color: COLORS.darkGray,
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