import React, { useContext, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { PrimaryButton, Link } from '../buttons';
import { Row } from '../layout';
import FormItem from './FormItem';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import validateField from './formValidators';
import { UserContext } from '../../context';
import { login } from '../../firebase';

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
        setFormValue={(value) => setUsername(value)}
        Icon={{
          component: FontAwesome,
          name: "user-circle",
          size: 20,
        }}
      />
      <FormItem
        placeholder="Senha"
        password
        setFormValue={(value) => setPassword(value)}
        Icon={{
          component: FontAwesome,
          name: "user-circle",
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
          label="Esqueci minha senha"
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        />
        <PrimaryButton
          label="Entrar"
          onPress={() => login({ username, password, setUserLogged: () => {
            setUserInfo({ ...userInfo, logged: true })},
            setError: (e) => setError(e),
          })}
          style={styles.button}
        />
      </Row>
      {!!error && <Text style={styles.error}>Credenciais inválidas.</Text>}
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
    textWeight: 'bold',
  }
}

export default LoginForm;