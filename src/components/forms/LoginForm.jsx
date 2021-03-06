import React, { useContext, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { PrimaryButton, Link } from '../buttons';
import { Row } from '../layout';
import FormItem from './FormItem';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import validateField from './formValidators';
import { UserContext, AuthenticationContext, CondosContext } from '../../context';
import { AsyncStorage } from 'react-native';
import { login } from '../../auth';

const LoginForm = ({ navigation, loading, setLoading }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [isLogged, setIsLogged] = useContext(AuthenticationContext);
  const [allCondos, setAllCondos] = useContext(CondosContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const signIn = async ({ username, password } = {}) => {
    let storedInfo = {};
    if (!username || !password) {
      storedInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
      if (storedInfo && storedInfo.email && storedInfo.senha) {
        username = storedInfo.email;
        password = storedInfo.senha;
      } else {
        setLoading(false);
        return;
      }
    }
    try {
      const {
        name: nome,
        phoneNumber: telefone,
        birthDate: nascimento,
        machineCompanyCode,
        email,
        condoId,
      } = await login({ email: username, password })
      const newUserInfo = {
        ...userInfo,
        nome,
        telefone,
        nascimento,
        condo: {
          ...userInfo.condo,
          name: Array.isArray(allCondos) && allCondos.filter(({ machineCompanyCode: code }) => code === machineCompanyCode)[0] && allCondos.filter(({ machineCompanyCode: code }) => code === machineCompanyCode)[0].name,
          token: Array.isArray(allCondos) && allCondos.filter(({ machineCompanyCode: code }) => code === machineCompanyCode)[0] && allCondos.filter(({ machineCompanyCode: code }) => code === machineCompanyCode)[0].token,
          machineCompanyCode,
          id: condoId,
        },
        email,
        senha: password,
        logged: true,
      };
      setIsLogged(true);
      setUserInfo(newUserInfo);
      try {
        console.warn('setting item: ', newUserInfo)
        await AsyncStorage.setItem('userInfo', JSON.stringify(newUserInfo))
      } catch (error) {
        setError(error.message)
      }
    } catch (e) {
      setError(e.message)
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    setLoading(!!userInfo.email && !!userInfo.password)
    if(userInfo.logged) setIsLogged(true)
  }, [userInfo.logged])

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
        keyBoardType = 'email-address'
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
          label="Esqueci minha senha"
          onPress={() => navigation.navigate('ResetPassword')}
        />
        <PrimaryButton
          label="Entrar"
          onPress={() => {
            if (!username.includes('@') || !username.includes('.')) { setError('Digite um email válido.'); return; }
            if (!password) { setError('Insira uma senha.'); return }
            setLoading(true);
            signIn({ username, password })
              .then(() => setLoading(false));
          }}
          loading={loading}
          style={styles.button}
        />
      </Row>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </>
  )
};

const styles = {
  buttonContainer: {
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