import React, { useState, useCallback, useEffect } from 'react';
import { Image, Text, Keyboard } from 'react-native';
import { PrimaryButton } from '../buttons';
import { ResetPassword } from '../../assets/images';
import { FormItem } from '../forms'; 
import { AntDesign } from '@expo/vector-icons';
import Screen from './Screen';
import validateField from '../forms/formValidators';
import { COLORS, SCREEN_WIDTH } from '../../constants';
import { sendPasswordResetEmail } from '../../auth';
import { StackHeader } from '../headers';

const ResetPasswordScreen = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
  }, []);
  const handleSubmit = useCallback(async ({ email }) => {
    try {
      await sendPasswordResetEmail({ email });
      if(navigation) navigation.navigate('PasswordFeedback'); else onPress();
    } catch (error) {
      // setError('Ocorreu um erro. Tente novamente mais tarde.')
      const errorMsgKeys = Object.keys(errors)
        .filter((e) => error.message.includes(e));
        
      setError(errors[errorMsgKeys[0]]);
    }
  }, []);
  return (
    <Screen style={styles.container}>
      <StackHeader onPress={() => navigation.goBack()} />
      {!keyboardOpen && <Image source={ResetPassword} style={styles.image} resizeMode="contain"/>}
      <Text style={styles.title}>Tudo bem, acontece</Text>
      <Text style={styles.description}>Para recuperar sua senha, insira seu endereço de e-mail, que enviaremos um link de recuperação pra lá!</Text>
      <FormItem
          placeholder="E-mail"
          // setFormValue={(value) => validateField(stepIndex, value) && setLastValue(value)}   
          setFormValue={(value) => { setEmail(value) }}   
          onFocus={() => setError('')}
          style={{ marginBottom: 22 }}
          type="email"
          Icon={{
            component: AntDesign,
            name: "mail",
            size: 20,
          }}
          />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <PrimaryButton
        label="Próximo"
        disabled={!validateField(2, email)}
        style={styles.button}
        onPress={() => { handleSubmit({ email }) }}
      />
    </Screen>
  )
}

const styles = {
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '4%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    alignSelf: 'flex-start',
    marginBottom: '5%',
  },
  error: {
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 22,
  },
  icon: {
    color: COLORS.primary,
    marginBottom: '5%'
  },
  image: {
    flex: 1,
    maxWidth: SCREEN_WIDTH - 30,
  },
  description: {
    fontSize: 15,
    color: COLORS.darkLilac,
    marginBottom: 22,
  },
  button: {
    width: '80%',
  }
}

const errors = {
  'user record': 'O e-mail informado não está cadastrado na plataforma.',
  'badly': 'O e-mail inserido é inválido',
  'network': 'Erro de conexão: verifique se você está conectado na internet',
};

export default ResetPasswordScreen;