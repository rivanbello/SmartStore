import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../../constants';

const Link = ({ style, label, onPress }) => (
  <TouchableOpacity
    style={{
      ...styles.container,
      ...style,
    }}
    onPress={() => onPress && onPress()}
  >
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.darkGray,
    fontWeight: 'bold',
    fontSize: 15,
  }
};

export default Link;