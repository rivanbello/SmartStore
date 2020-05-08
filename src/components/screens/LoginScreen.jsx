import React from 'react';
import { LoginBackground } from '../../assets/images';
import { Image, Text } from 'react-native';
import { TopAlert } from '../misc';
import { LoginForm } from '../forms';
import { COLORS } from '../../constants';
import Screen from './Screen'
import { SCREEN_WIDTH } from '../../constants';

const LoginScreen = ({ navigation }) => {
  return (
    <Screen>
      <Image
        style={styles.image}
        source={LoginBackground}
      />
      <Text style={styles.title}>Compras inteligentes para sua família</Text>
      <LoginForm navigation={navigation} />
      <TopAlert
        firstLabel="Ainda não tem conta?"
        secondLabel=" Cadastre-se"
        style={{ top: 60 }}
        onPress={() => navigation.navigate('Register')}
      />
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
    marginTop: '30%',
    marginBottom: '4%',
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