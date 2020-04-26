import React from 'react';
import Screen from './Screen';
import { StackHeader } from '../headers';
import { Text } from 'react-native';
import { COLORS } from '../../constants';
import { FormItem } from '../forms';

const RegisterScreen = () => (
  <Screen>
    <StackHeader />
    <Text style={styles.title}>Cadastro</Text>
    <Text style={styles.stepLabel}>Vamos começar pelo seu nome</Text>
    <FormItem
    />
  </Screen>
);

const styles = {
  title: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  stepLabel: {
    fontSize: 26,
    fontWeight: 'bold',
  }
}

export default RegisterScreen;