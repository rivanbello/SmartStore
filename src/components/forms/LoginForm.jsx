import React from 'react';
import { PrimaryButton } from '../buttons';
import FormItem from './FormItem';
import { FontAwesome, Entypo } from '@expo/vector-icons';

const LoginForm = () => {

  return (
    <>
      <FormItem
        placeholder="E-mail"
        style={{ marginBottom: 22 }}
        Icon={{
          component: FontAwesome,
          name: "user-circle",
          size: 20,
        }}
      />
      <FormItem
        placeholder="Senha"
        password
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
      <PrimaryButton
        label="Entrar"
        style={styles.button}
      />
    </>
  )
};

const styles = {
  button: {
    marginTop: 40,
    marginBottom: 19,
  },
}

export default LoginForm;