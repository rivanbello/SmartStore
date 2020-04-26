import React from 'react';
import { COLORS } from '../../constants';
import { TouchableOpacity, Text } from 'react-native';

const PrimaryButton = ({ onPress, label }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => onPress && onPress()}  
  >
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = {
  container: {
    backgroundColor: COLORS.primary,
    height: 44,
    width: '100%',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  }
}

export default PrimaryButton;