import React from 'react';
import { ConfirmationScreen } from '../screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PaymentConfirmedScreen = ({ navigation }) => {
    return (
        <ConfirmationScreen
            title="Pagamento realizado!"
            description="Você pode retirar os itens que você solicitou quando quiser!"
            Icon={{
                family: MaterialCommunityIcons,
                size: 200,
                name: 'check-circle',
              }}
            buttonLabel="Voltar às compras"
            onPress={() => navigation.navigate('Navigator')}
      />
    )
};

export default PaymentConfirmedScreen;