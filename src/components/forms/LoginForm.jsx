import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import FormItem from './FormItem';
import { Row } from '../layout';
import { COLORS } from '../../constants';
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
    </>
  )
};

export default LoginForm;