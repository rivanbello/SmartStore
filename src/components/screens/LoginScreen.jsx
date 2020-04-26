import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { LoginHeader } from '../headers';
import { LoginForm } from '../forms';
import { PrimaryButton, Link } from '../buttons';
import { COLORS } from '../../constants';
import Screen from './Screen'

const LoginScreen = () => {
  return (
    <Screen>
      <LoginHeader />
      <MaterialIcons
        size={250}
        name="landscape"
        style={
          styles.icon
        }
      />
      <LoginForm />
      <PrimaryButton
        label="Entrar"
        style={styles.button}
      />
      <Link
        label="Esqueci minha senha"
        style={styles.passwordLink}
      />
    </Screen>
  )
}

const styles = {
  button: {
    marginTop: 40,
    marginBottom: 19,
  },
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