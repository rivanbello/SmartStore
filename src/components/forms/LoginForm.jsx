import React from 'react';
import FormItem from './FormItem';
import { COLORS } from '../../constants';
import { FontAwesome } from '@expo/vector-icons';

const LoginForm = () => (
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
      Icon={{
        component: FontAwesome,
        name: "user-circle",
        size: 20
      }}
    />
  </>
);

export default LoginForm;