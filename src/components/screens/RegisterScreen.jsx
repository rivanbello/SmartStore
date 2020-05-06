import React, { useState, useEffect, useContext } from 'react';
import Screen from './Screen';
import { StackHeader } from '../headers';
import { Text, SafeAreaView, Animated } from 'react-native';
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
import { CondoForm } from '../forms';

const icons = {
  'FontAwesome': FontAwesome,
  'AntDesign': AntDesign,
  'Ionicons': Ionicons,
  'Feather': Feather,
  'MaterialCommunityIcons': MaterialCommunityIcons,
}

const RegisterScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [steps, setSteps] = useState(generateSteps({}));
  const [stepIndex, setStepIndex] = useState(0);
  const [getBackFunction, setGetBackFunction] = useState(() => (currentIndex) => {
    setHideHeader(false);
    setfadeOpacity(new Animated.Value(0));
    if (currentIndex > 0) setStepIndex(currentIndex - 1);
    // else navigation.navigate('login')
  });
  const [chosenCondo, setChosenCondo] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastValue, setLastValue] = useState('');
  const [fadeOpacity, setfadeOpacity] = useState(new Animated.Value(0));
  const nextStep = () => {
    if (stepIndex < 3 && !validateField(stepIndex, lastValue) || !lastValue) {
      fadeOpacity.setValue(1);
      setfadeOpacity(new Animated.Value(1));
    } else if (stepIndex === 3 && typeof lastValue === 'date' && (lastValue.UTC() < 1325383200000)) {
      fadeOpacity.setValue(1);
      setfadeOpacity(new Animated.Value(1));
    } else if (stepIndex === 4 && !chosenCondo) {
      fadeOpacity.setValue(1);
      setfadeOpacity(new Animated.Value(1));
    } else if (stepIndex < (steps.length - 1)) setStepIndex(stepIndex + 1);
    else navigation.navigate('RegisterConfirmation');
  }

  useEffect(() => {
      Animated.timing(fadeOpacity, {
        toValue: 0,
        delay: 2000,
        duration: 1000,
      }).start();
  }, [fadeOpacity])

  useEffect(() => {
    setLastValue(userInfo[`${steps[stepIndex].formItems[0].placeholder.toLowerCase()}`] || '')
  },[stepIndex])

  return (
    <Screen>
      <StackHeader
        onPress={stepIndex === 0 ? () => navigation.goBack() : () => getBackFunction(stepIndex)}
      />
      <Animated.View
        style={{ opacity: fadeOpacity }}
      >
        <TopAlert 
          secondLabel={
            stepIndex < 4 ?
            `Digite um ${steps[stepIndex].formItems[0].placeholder.toLowerCase()} válido`
            : 'Escolha um condomínio'
          }
          error
          style={{ top: 5 }}
        />
      </Animated.View>
      <SafeAreaView style={styles.content}>
        {!hideHeader && 
          <>
            <Text style={styles.title}>Cadastro</Text>
            {steps[stepIndex].label}
          </>
        }
        {stepIndex === 4 && <CondoForm
          data={condos}
          setHideHeader={setHideHeader}
          setFormValue={(value) => {
            const newUserInfo = {
              ...userInfo,
              [`${steps[stepIndex].formItems[0].placeholder.toLowerCase()}`]: value,
            };
            setUserInfo(newUserInfo)
            setChosenCondo(value);
            setSteps(generateSteps(newUserInfo)); 
            setLastValue(value);
          }}
        />}
        {stepIndex < 4 && <FormItem
          phoneNumber={steps[stepIndex].phoneNumber}
          focused
          savedValue={lastValue}
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
        />}
        <RegisterFooter
          step={stepIndex + 1}
          style={{
            backgroundColor: 'white',
          }}
          totalSteps={5}
          onPress={() => nextStep()}
        />
      </SafeAreaView>
    </Screen>
  )
};

const condos = [
  {
    name: "Condomínio Santa Cruz",
    address: "R. Luiz Carlos Alvez, Mercês, 126523",
    neighborhood: "Mercês - Curitiba",
    distance: "15m",
  },
  {
    name: "Condomínio Água da Pedra",
    address: "R. Almirante José Padilha, 324",
    neighborhood: "Santa Felicidade - Curitiba",
    distance: "13km",
  },
  {
    name: "Condomínio 2gua da Pedra",
    address: "R. Almirante José Padilha, 324",
    neighborhood: "Santa Felicidade - Curitiba",
    distance: "13km",
  },
  {
    name: "Condomínio 3gua da Pedra",
    address: "R. Almirante José Padilha, 324",
    neighborhood: "Santa Felicidade - Curitiba",
    distance: "13km",
  },
  // {
  //   name: "Condomínio 4gua da Pedra",
  //   address: "R. Almirante José Padilha, 324",
  //   neighborhood: "Santa Felicidade - Curitiba",
  //   distance: "13km",
  // },
  // {
  //   name: "Condomínio 5gua da Pedra",
  //   address: "R. Almirante José Padilha, 324",
  //   neighborhood: "Santa Felicidade - Curitiba",
  //   distance: "13km",
  // },
]

const styles = {
  title: {
    fontSize: 14,
    color: '#D1D0DE',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    flex: 1,
    marginTop: '16%',
  },
}

export default RegisterScreen;