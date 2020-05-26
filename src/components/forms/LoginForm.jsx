import React, { useContext, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { PrimaryButton, Link } from '../buttons';
import { Row } from '../layout';
import FormItem from './FormItem';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import validateField from './formValidators';
import { UserContext } from '../../context';
// import { AsyncStorage } from 'react-native';
import { login, register } from '../../auth';

const LoginForm = ({ navigation }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if(userInfo.logged) navigation.navigate('Navigator', { username, password });
  }, [userInfo])

  return (
    <>
      <FormItem
        placeholder="E-mail"
        setFormValue={(value) => validateField(stepIndex, value) && setLastValue(value)}        
        style={{ marginBottom: 22 }}
        type="email"
        setFormValue={(value) => setUsername(value)}
        Icon={{
          component: FontAwesome,
          name: "user-circle",
          size: 20,
        }}
      />
      <FormItem
        placeholder="Senha"
        type="password"
        style={{ marginBottom: 22 }}
        setFormValue={(value) => setPassword(value)}
        Icon={{
          component: FontAwesome,
          name: "key",
          size: 20
        }}
        RightIcon={{
          component: Entypo,
          activeName: 'eye-with-line',
          name: "eye",
          size: 24,
        }}
      />
      <Row style={styles.buttonContainer}>
        <Link
          label=""
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        />
        <PrimaryButton
          label="Entrar"
          onPress={() => {
            if (!username.includes('@') || !username.includes('.')) { setError('Digite um email válido.'); return; }
            if (!password) { setError('Insira uma senha.'); return }
            login({ email: username, password })
            .then(({
              name: nome,
              phoneNumber: telefone,
              birthDate: nascimento,
              condoId,
              email,
              password: senha,
            } = {}) => { 
              // console.warn(userInfo && userInfo.condos && userInfo.condos.filter(({ id }) => id === condoId)[0].name)
              setUserInfo({
              nome,
              telefone,
              nascimento,
              condo: {
                name: userInfo && userInfo.condos && userInfo.condos.filter(({ id }) => id === condoId)[0] && userInfo.condos.filter(({ id }) => id === condoId)[0].name,
                id: condoId,
              },
              email,
              senha,
              logged: true
            })}, (err) => {
              setError(err.message)
            })
            .catch(e => setError(e))
          }}
          style={styles.button}
        />
      </Row>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </>
  )
};

const styles = {
  buttonContainer: {
    marginTop: 30,
    marginBottom: 19,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  }
}

export default LoginForm;