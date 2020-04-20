import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LoginHeader } from '../headers';
import { LoginForm } from '../forms';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <LoginHeader />
      <View>
        <LoginForm />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  }
})

export default LoginScreen;