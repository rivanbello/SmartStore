import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { COLORS } from '../../constants';
import { validCreditCard } from './cardFormValidators';
import { PrimaryButton } from '../buttons';

const CreditCardForm = ({ onSubmit }) => {
    const [cardInfo, setCardInfo] = useState({});
    const [complete, setComplete] = useState([]);
    const completedRef = useRef([]);
    const setItemCompleted = (value, index) => {
        console.warn(completedRef.current)
        const aux = completedRef.current;
        aux[index] = value;
        completedRef.current = aux;
    };
    const [step, setStep] = useState(0);
    const handleSubmit = () => {
        
    };
    useEffect(() => console.warn(completedRef.current), [completedRef.current.length]);
    return (
        <>
            <Text style={styles.title}>Adicionar um cartão</Text>
            {formItems.slice(step * 4, step * 4 + 4).map(({ placeholder, error, validator }, i) =>
                <CreditCardFormItem
                    onComplete={(value, index) => setItemCompleted(value, index)}
                    index={i}
                    placeholder={placeholder}
                    error={error}
                    onChange={(value) => {
                        if(value) setCardInfo({ ...cardInfo, [`${step.key}`]: value })
                        else setErroredIndexes(...erroredIndexes, i);
                    }}
                    validator={validator}
                />
                )}
            <PrimaryButton
                onPress={() => {
                    if (step > 1) onSubmit({
                    });
                    else setStep(step + 1);
                }}
                label={step > 1 ? "Adicionar o cartão" : 'Próximo'}
            />
        </>
    );
};

const CreditCardFormItem = ({ error, placeholder, validator, onComplete, index }) => {
    const [showError, setShowError] = useState(false);
    const handleOnChangeValue = (v) => {
        setShowError(!validator(v));
        onComplete(validator(v), index);
    };

    // console.warn(validator(v))
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                onChangeText={(v) => handleOnChangeValue(v)}
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
        color: 'red'
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
        key: 'number',
        error: 'Insira um número válido',
        validator: (v) => validCreditCard(v),
    },
    {
        placeholder: 'Nome impresso',
        key: 'name',
        error: 'Insira o nome impresso no cartão',
        validator: (v) => (/[a-zA-Z]/).test(v),
    },
    {
        key: 'cvv',
        placeholder: 'Código de segurança',
        error: 'Insira o código de segurança',
        validator: (v) => (/[a-zA-Z]/).test(v),
    },
    {
        key: 'document',
        placeholder: 'CPF ou CNPJ',
        error: 'Insira um documento válido',
        validator: v => true
    },
    {
        key: 'street',
        placeholder: 'Rua',
        error: 'Insira o nome da rua',
        validator: (v) => v,
    },
    {
        key: 'number',
        placeholder: 'Número',
        error: 'Insira um número válido',
        validator: (v) => /D/g.test(v) ,
    },
    {
        key: 'complement',
        placeholder: 'Complemento',
        validator: () => true,
    },
    {
        key: 'district',
        placeholder: 'Bairro',
        error: 'Insira um bairro',
        validator: (v) => v,
    },
    {
        key: 'city',
        placeholder: 'Cidade',
        error: 'Insira a cidade',
        validator: (v) => v,
    },
    {
        key: 'state',
        placeholder: 'Estado',
        error: 'Insira o estado',
        validator: (v) => v,

    },
]

export default CreditCardForm;
