import React from 'react';
import ConfirmationScreen from './ConfirmationScreen';
import { PaymentFailed } from '../../assets/images';

const PaymentErrorScreen = ({ navigation }) => {

    return (
        <ConfirmationScreen
            title="Algo deu errado no pagamento"
            description="Não se preocupe, você pode tentar novamente"
            image={PaymentFailed}
            buttonLabel="Tentar novamente"
            linkLabel="Cancelar"
            onPressLink={() => navigation.navigate('Navigator')}
            onPress={() => navigation.goBack()}
      />
    )
};

export default PaymentErrorScreen;