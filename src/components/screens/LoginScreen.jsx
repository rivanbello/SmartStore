import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
// import { LoginHeader } from '../headers';
import { TopAlert } from '../misc';
import { LoginForm } from '../forms';
import { Link } from '../buttons';
import { COLORS } from '../../constants';
import Screen from './Screen'

const LoginScreen = () => {
  return (
    <Screen>
      <TopAlert
        firstLabel="Ainda não tem conta?"
        secondLabel=" Cadastre-se"
      />
      <MaterialIcons
        size={250}
        name="landscape"
        style={styles.icon}
      />
      <LoginForm />
      <Link
        label="Esqueci minha senha"
        style={styles.passwordLink}
      />
    </Screen>
  )
}

const styles = {
  passwordLink: {
    marginBottom: 40,
  },
  icon: {
    color: COLORS.primary,
    flex: 1,
    alignSelf: 'center',
  }
}

export default LoginScreen;