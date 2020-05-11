import React, { useState, useEffect, useContext } from 'react';
import Screen from './Screen';
import { StackHeader } from '../headers';
import { Text, SafeAreaView, Animated, AsyncStorage } from 'react-native';
import { register } from '../../auth';
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
  const [registerError, setRegisterError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [stepName, setStepName] = useState(steps[stepIndex].formItems[0].placeholder.toLowerCase())
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
    if ((stepIndex < 4 || stepIndex === 6) && (!validateField(stepIndex, lastValue) || !lastValue)) {
      fadeOpacity.setValue(1);
      setfadeOpacity(new Animated.Value(1));
    } else if (stepIndex === 4 && typeof lastValue === 'date' && (lastValue.UTC() < 1325383200000)) {
      fadeOpacity.setValue(1);
      setfadeOpacity(new Animated.Value(1));
    } else if (stepIndex === 5 && !chosenCondo) {
      fadeOpacity.setValue(1);
      setfadeOpacity(new Animated.Value(1));
    } else if (stepIndex < (steps.length - 1)) setStepIndex(stepIndex + 1);
    else if (userInfo.condo && userInfo.condo.id) {
      const infoToSave = {
        email: userInfo['e-mail'],
        name: userInfo.nome,
        phoneNumber: userInfo.telefone,
        birthDate: userInfo.nascimento,
        condoId: userInfo.condo.id,
        password: userInfo.senha,
      }
      register(infoToSave).then(() => {
        setUserInfo({ ...userInfo })
        AsyncStorage.setItem(userInfo['e-mail'], infoToSave);
        navigation.navigate('RegisterConfirmation');
      })
      .catch((e) => {
        setfadeOpacity(1);
        setRegisterError(e)
      });
    }
  }

  useEffect(() => {
      Animated.timing(fadeOpacity, {
        toValue: 0,
        delay: 2000,
        duration: 1000,
      }).start();
  }, [fadeOpacity, setRegisterError])

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
          secondLabel={(() => {
            switch (steps[stepIndex].type) {
              case 'datePicker':
                return `Insira uma data de ${steps[stepIndex].formItems[0].placeholder.toLowerCase()} válida`
              case 'condo':
                if (registerError) return registerError;
                else return 'Escolha um condomínio'
              case 'password':
                return 'Digite uma senha válida'
              default:
                return `Digite um ${steps[stepIndex].formItems[0].placeholder.toLowerCase()} válido`
            }})()
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
        {stepIndex === 5 && userInfo.condos.length > 0 && <CondoForm
          data={userInfo.condos}
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
        {(stepIndex < 5 || stepIndex === 6) && <FormItem
          phoneNumber={steps[stepIndex].phoneNumber}
          focused
          savedValue={lastValue}
          type={steps[stepIndex].type}
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
          totalSteps={steps.length}
          onPress={() => nextStep()}
        />
      </SafeAreaView>
    </Screen>
  )
};

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