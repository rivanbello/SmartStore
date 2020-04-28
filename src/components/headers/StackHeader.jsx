import React from 'react';
import Header from './Header';
import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const StackHeader = ({ onPress = (() => {}) }) => (
  <Header style={styles.container}>
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
    >
      <Feather
        name="arrow-left"
        size={26}
        style={{ left: -2 }}
      />
      <Text>Voltar</Text>
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