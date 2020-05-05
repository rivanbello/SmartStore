import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { LoginBackground } from '../../assets/images';
import { Image, Text } from 'react-native';
import { TopAlert } from '../misc';
import { LoginForm } from '../forms';
import { COLORS } from '../../constants';
import Screen from './Screen'
import { SCREEN_WIDTH } from '../../constants';

const LoginScreen = () => {
  return (
    <Screen>
      <TopAlert
        firstLabel="Ainda não tem conta?"
        secondLabel=" Cadastre-se"
        style={{ top: 70 }}
      />
      <Image
        style={styles.image}
        source={LoginBackground}
      />
      <Text style={styles.title}>Compras inteligentes para sua família</Text>
      <LoginForm />
    </Screen>
  )
}

const styles = {
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    maxWidth: '90%',
    fontSize: 32,
    color: COLORS.textPrimary,
  },
  image: {
    width: SCREEN_WIDTH * 1.02,
    left: '-5%',
  },
  icon: {
    color: COLORS.primary,
    flex: 1,
    alignSelf: 'center',
  }
}

export default LoginScreen;