import React from 'react';
import { PrimaryButton } from '../buttons';
import FormItem from './FormItem';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import validateField from './formValidators';

const LoginForm = () => {

  return (
    <>
      <FormItem
        placeholder="E-mail"
        setFormValue={(value) => validateField(stepIndex, value) && setLastValue(value)}        
        style={{ marginBottom: 22 }}
        setFormValue={() => () => {}}
        Icon={{
          component: FontAwesome,
          name: "user-circle",
          size: 20,
        }}
      />
      <FormItem
        placeholder="Senha"
        password
        setFormValue={() => () => {}}
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