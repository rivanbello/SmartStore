import React from 'react';
import { PrimaryButton, Link } from '../buttons';
import { Row } from '../layout';
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
      <Row style={styles.buttonContainer}>
        <Link
          label="Esqueci minha senha"
        />
        <PrimaryButton
          label="Entrar"
          style={styles.button}
        />
      </Row>
    </>
  )
};

const styles = {
  buttonContainer: {
    marginTop: 30,
    marginBottom: 19,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
  },
}

export default LoginForm;