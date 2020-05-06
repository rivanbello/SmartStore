import React from 'react';
import ConfirmationScreen from './ConfirmationScreen';
import { FeedbackImage } from './../../assets/images';

const FeedbackConfirmationScreen = ({ navigation }) => (
  <ConfirmationScreen
    title="Muito obrigado!"
    description="Seu Feedback é muito importante."
    image={FeedbackImage}
    buttonLabel={'Voltar ao início'}
    onPress={() => navigation.navigate('Navigator')}
  />
)

export default FeedbackConfirmationScreen;