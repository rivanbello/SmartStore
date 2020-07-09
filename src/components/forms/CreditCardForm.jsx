import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { COLORS } from '../../constants';
import { validCreditCard } from './cardFormValidators';
import { PrimaryButton } from '../buttons';

const CreditCardForm = () => {
    return (
        <>
            <Text style={styles.title}>Adicionar um cartão</Text>
            {formItems.map(({ placeholder, error, validator }) =>
                <CreditCardFormItem
                    placeholder={placeholder}
                    error={error}
                    validator={validator}
                />
            )}
            <PrimaryButton
                label="Adicionar o cartão"
            />
        </>
    );
}

const CreditCardFormItem = ({ error, placeholder, validator }) => {
    const [showError, setShowError] = useState(false);
    const handleOnChangeValue = (v) => setShowError(!validator(v))
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                onChangeValue={(v) => handleOnChangeValue(v)}
                style={styles.input}
            />
            <View style={styles.divider} />
            <Text style={styles.error}>{showError && error}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 16,
        marginBottom: 12,
    },
    error: {
        
    },
    input: {
        fontSize: 13,
    },
    divider: {
        borderTopWidth: 1,
        borderColor: COLORS.lightLilac,
    }
});

const formItems = [
    {
        placeholder: 'Número do cartão',
        error: 'Insira um número válido',
        validator: (v) => validCreditCard(v),
    },
    {
        placeholder: 'Nome impresso',
        error: 'Insira o nome impresso no cartão'
    },
    {
        placeholder: 'Código de segurança',
        error: 'Insira o código de segurança'
    },
    {
        placeholder: 'CPF ou CNPJ',
        error: 'Insira um documento válido'
    },
]

export default CreditCardForm;
