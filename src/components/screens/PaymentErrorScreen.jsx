import React, { useContext, useEffect } from 'react';
import ConfirmationScreen from './ConfirmationScreen';
import { LoadingContext } from '../../context';
import { PaymentFailed } from '../../assets/images';

const PaymentErrorScreen = ({ navigation }) => {

    const [loadingObj, setLoadingObj] = useContext(LoadingContext);
    useEffect(() => {
        setLoadingObj({ loading: false, label: 'Carregando' });
    }, []);
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