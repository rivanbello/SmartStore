import React from 'react';
import FormItem from './FormItem';
import { COLORS } from '../../constants';
import { FontAwesome } from '@expo/vector-icons';

const LoginForm = () => (
  <FormItem
    placeholder="E-mail"
    Icon={{
      component: FontAwesome,
      name: "user-circle",
      size: 20
    }}
    // active
  />
);

export default LoginForm;