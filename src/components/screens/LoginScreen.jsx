import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LoginHeader } from '../headers';
import { LoginForm } from '../forms';
import Screen from './Screen'

const LoginScreen = () => {
  return (
    <Screen>
      <LoginHeader />
      <View>
        <LoginForm />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  }
})

export default LoginScreen;