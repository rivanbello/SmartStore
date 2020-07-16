import React from 'react';
import { ConfirmationScreen } from '../screens';

const PaymentConfirmedScreen = ({ navigation }) => {
    return (
        <ConfirmationScreen
            title="Pagamento realizado!"
            description="Você pode retirar os itens que você solicitou quando quiser!"
            // image={FeedbackImage}
            buttonLabel="Voltar às compras"
            onPress={() => navigation.navigate('Navigator')}
      />
    )
};

export default PaymentConfirmedScreen;