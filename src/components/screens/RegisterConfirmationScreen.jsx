import React, { useContext, useEffect } from 'react';
import { ConfirmationScreen } from '.';
import { UserContext } from '../../context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RegisterConfirmationScreen = ({ navigation }) => {
  return (
    <ConfirmationScreen
      title='Perfeito'
      description='Agora você pode aproveitar a experiência de comprar da forma mais confortável'
      buttonLabel='Finalizar cadastro'
      Icon={{
        family: MaterialCommunityIcons,
        size: 200,
        name: 'check-circle',
      }}
      onPress={() => navigation.navigate('Navigator')}
    />
  );
};

export default RegisterConfirmationScreen;