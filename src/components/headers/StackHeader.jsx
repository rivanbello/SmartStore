import React from 'react';
import Header from './Header';
import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants';

const StackHeader = ({ onPress = (() => {}), style, fontStyle }) => (
  <Header style={{ ...styles.container, ...style }}>
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
    >
      <Feather
        name="arrow-left"
        size={26}
        style={{
          left: -2,
          color: COLORS.textPrimary,
          ...fontStyle,
        }}
      />
      <Text style={{ color: COLORS.textPrimary, ...fontStyle }}>Voltar</Text>
    </TouchableOpacity>
  </Header>
);

const styles = {
  container: {
    justifyContent: 'flex-start',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }
}

export default StackHeader;