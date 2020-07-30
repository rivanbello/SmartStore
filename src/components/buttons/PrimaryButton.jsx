import React from 'react';
import { COLORS } from '../../constants';
import { TouchableOpacity, Text,ActivityIndicator, View } from 'react-native';

const PrimaryButton = ({ onPress, label, style, labelStyle, disabled, loading }) => {
  const Button = disabled || loading ? View : TouchableOpacity;
  return (<Button
    disabled={disabled}
    style={[
      styles.container,
      style,
      { backgroundColor: loading || disabled ? COLORS.gray : COLORS.primary },
    ]}
    onPress={() => onPress && onPress()}  
  >
    {loading && <ActivityIndicator size="small" color={COLORS.primary}  style={{ marginRight: 8}} />}
    <Text style={{ 
      ...styles.label,
      ...labelStyle,
      color: disabled || loading ? COLORS.darkGray : '#fff',
    }}>
      {label}
    </Text>
  </Button>);
};

const styles = {
  container: {
    backgroundColor: COLORS.primary,
    height: 44,
    width: '100%',
    flexDirection: 'row',
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