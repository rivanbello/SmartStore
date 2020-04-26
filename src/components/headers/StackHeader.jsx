import React from 'react';
import Header from './Header';
import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const StackHeader = () => (
  <Header style={styles.container}>
    <TouchableOpacity style={styles.wrapper}>
      <Feather
        name="arrow-left"
        size={26}
      />
      <Text> Voltar</Text>
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