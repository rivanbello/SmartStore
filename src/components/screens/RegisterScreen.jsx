import React, { useState, useEffect, useContext } from 'react';
import Screen from './Screen';
import { StackHeader } from '../headers';
import { Text, SafeAreaView, Animated } from 'react-native';
import { COLORS } from '../../constants';
import { FormItem } from '../forms';
import { RegisterFooter } from '../footers';
import validateField from '../forms/formValidators';
import generateSteps from './formSteps';
import {
  FontAwesome,
  AntDesign,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { TopAlert } from '../misc';
import { UserContext } from '../../context';
// import steps from './formSteps'

const icons = {
  'FontAwesome': FontAwesome,
  'AntDesign': AntDesign,
  'Ionicons': Ionicons,
  'Feather': Feather,
  'MaterialCommunityIcons': MaterialCommunityIcons,
}

const RegisterScreen = () => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [steps, setSteps] = useState(generateSteps({}));
  const [stepIndex, setStepIndex] = useState(0);
  const [getBackFunction, setGetBackFunction] = useState(() => (currentIndex) => {
    if (currentIndex > 0) setStepIndex(currentIndex - 1);
    // else navigation.navigate('login')
  });
  const [lastValue, setLastValue] = useState('');
  const [fadeOpacity, setfadeOpacity] = useState(new Animated.Value(0));
  const nextStep = () => {
    if (!validateField(stepIndex, lastValue)) {
      fadeOpacity.setValue(1);
      setfadeOpacity(new Animated.Value(1));
    }
    else if (stepIndex < (steps.length - 1)) setStepIndex(stepIndex + 1);
    // else navigation.navigate ...
  }

  useEffect(() => {
      Animated.timing(fadeOpacity, {
        toValue: 0,
        delay: 2000,
        duration: 1000,
      }).start();
  }, [fadeOpacity])

  return (
    <Screen>
      <StackHeader
        onPress={() => getBackFunction(stepIndex)}
      />
      <Animated.View
        style={{ opacity: fadeOpacity }}
      >
        <TopAlert 
          secondLabel={`Digite um ${steps[stepIndex].formItems[0].placeholder.toLowerCase()} válido`}
          error
          style={{ top: 16 }}
        />
      </Animated.View>
      <SafeAreaView style={styles.content}>
        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.stepLabel}>{steps[stepIndex].label}</Text>
        <FormItem
          phoneNumber={steps[stepIndex].phoneNumber}
          focused
          savedValue={userInfo[`${steps[stepIndex].formItems[0].placeholder.toLowerCase()}`] || ''}
          style={styles.formItem}
          datePicker={steps[stepIndex].datePicker}
          placeholder={steps[stepIndex].formItems[0].placeholder}
          showError
          Icon={{
            component: icons[steps[stepIndex].formItems[0].iconFamily],
            name: steps[stepIndex].formItems[0].iconName,
            size: 20,
          }}
          setFormValue={(value) => {
            const newUserInfo = {
              ...userInfo,
              [`${steps[stepIndex].formItems[0].placeholder.toLowerCase()}`]: value,
            };
            setUserInfo(newUserInfo)
            setSteps(generateSteps(newUserInfo)); 
            setLastValue(value);
          }}
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