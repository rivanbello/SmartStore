import React, { useState } from 'react';
import Screen from './Screen';
import { StackHeader } from '../headers';
import { Text } from 'react-native';
import { COLORS } from '../../constants';
import { FormItem } from '../forms';
import steps from './formSteps';

const RegisterScreen = ({ step: {  } = {} }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [getBackFunction, setGetBackFunction] = useState(() => () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
    // else navigation.navigate('login')
  });
  const nextStep = () => {
    if (stepIndex < steps.length) setStepIndex(stepIndex + 1);
    // else navigation.navigate ...
  }

  return (
    <Screen>
      <StackHeader />
      <Text style={styles.title}>Cadastro</Text>
      <Text style={styles.stepLabel}>Vamos começar pelo seu nome</Text>
      <FormItem
        Icon={{
          component: Icons['FontAwesome'],
          name: steps[stepIndex].iconName,
          size: 20,
        }}
      />
    </Screen>
  )
};

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