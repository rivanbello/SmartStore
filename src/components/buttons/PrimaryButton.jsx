import React from 'react';
import { COLORS } from '../../constants';
import { TouchableOpacity, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const PrimaryButton = ({ onPress, label, style, labelStyle, disabled }) => (
  <TouchableOpacity
    disabled={disabled}
    style={{
      ...styles.container,
      ...style,
      backgroundColor: disabled ? COLORS.lightGray : COLORS.primary,
    }}
    onPress={() => onPress && onPress()}  
  >
    <Text style={{ 
      ...styles.label,
      ...labelStyle,
      color: disabled ? COLORS.gray : '#fff',
    }}>
      {label}
    </Text>
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