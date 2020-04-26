import React from 'react';
import { View } from 'react-native';
import { LoginHeader } from '../headers';
import { LoginForm } from '../forms';
import { PrimaryButton } from '../buttons';
import Screen from './Screen'

const LoginScreen = () => {
  return (
    <Screen>
      <LoginHeader />
      <View>
        <LoginForm />
      </View>
      <PrimaryButton label="Entrar" />
    </Screen>
  )
}

export default LoginScreen;