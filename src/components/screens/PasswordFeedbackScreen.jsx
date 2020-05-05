import React from 'react';
import { ConfirmationScreen } from './ConfirmationScreen';
import { PasswordFeedback } from '../../assets/images';

const PasswordFeedbackScreen = ({ navigation }) => (
  <ConfirmationScreen
    title="Tudo certo!"
    description="Enviaremos instruções para o seu endereço de e-mail"
    image={PasswordFeedback}
    buttonLabel={'Voltar ao Login'}
    onPress={() => navigation.navigate('Login')}
  />
);

export default PasswordFeedbackScreen;