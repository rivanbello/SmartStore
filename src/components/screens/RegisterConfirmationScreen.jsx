import React, { useContext, useEffect } from 'react';
import { ConfirmationScreen } from '.';
import { UserContext } from '../../context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RegisterConfirmationScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
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
      onPress={() => setUserInfo({ ...userInfo, logged: true })}
    />
  );
};

export default RegisterConfirmationScreen;