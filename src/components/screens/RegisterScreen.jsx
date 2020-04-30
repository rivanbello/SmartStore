import React, { useState, useEffect } from 'react';
import Screen from './Screen';
import { StackHeader } from '../headers';
import { Text, SafeAreaView, Animated } from 'react-native';
import { COLORS } from '../../constants';
import { FormItem } from '../forms';
import { RegisterFooter } from '../footers';
import validateField from '../forms/formValidators';
import steps from './formSteps';
import {
  FontAwesome,
  AntDesign,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { TopAlert } from '../misc';

const icons = {
  'FontAwesome': FontAwesome,
  'AntDesign': AntDesign,
  'Ionicons': Ionicons,
  'Feather': Feather,
  'MaterialCommunityIcons': MaterialCommunityIcons,
}

const RegisterScreen = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [getBackFunction, setGetBackFunction] = useState(() => (currentIndex) => {
    if (currentIndex > 0) setStepIndex(currentIndex - 1);
    // else navigation.navigate('login')
  });
  const [showError, setShowError] = useState(true);
  const [valuesAndSteps, setValuesAndSteps] = useState([]);
  const [lastValue, setLastValue] = useState('');
  const nextStep = () => {
    if (!lastValue) { setShowError(true) }
    else if (stepIndex < (steps.length - 1)) setStepIndex(stepIndex + 1);
    // else navigation.navigate ...
  }

  useEffect(() => {
  })

  return (
    <Screen>
      <StackHeader
        onPress={() => getBackFunction(stepIndex)}
      />
      {showError &&
        <Animated.View>
          <TopAlert 
            secondLabel={`Digite um ${steps[stepIndex].formItems[0].placeholder.toLowerCase()} válido`}
            error
          />
        </Animated.View>        
      }
      <SafeAreaView style={styles.content}>
        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.stepLabel}>{steps[stepIndex].label}</Text>
        <FormItem
          phoneNumber={steps[stepIndex].phoneNumber}
          focused
          style={styles.formItem}
          datePicker={steps[stepIndex].datePicker}
          placeholder={steps[stepIndex].formItems[0].placeholder}
          showError
          Icon={{
            component: icons[steps[stepIndex].formItems[0].iconFamily],
            name: steps[stepIndex].formItems[0].iconName,
            size: 20,
          }}
          setFormValue={(value) => validateField(stepIndex, value) && setLastValue(value)}
        />
        <RegisterFooter
          step={stepIndex + 1}
          totalSteps={5}
          onPress={() => nextStep()}
        />
      </SafeAreaView>
    </Screen>
  )
};

const styles = {
  title: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepLabel: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 26,
  },
  content: {
    flex: 1,
    marginTop: '25%',
  },
}

export default RegisterScreen;