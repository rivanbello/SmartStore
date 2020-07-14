import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { COLORS } from '../../constants';
import { validCreditCard } from './cardFormValidators';
import { PrimaryButton } from '../buttons';

const CreditCardForm = ({ onSubmit }) => {
    const [cardInfo, setCardInfo] = useState({});
    const completedRef = useRef([]);
    const setItemCompleted = (value, index) => {
        const aux = completedRef.current;
        aux[index] = value;
        completedRef.current = aux;
    };
    const [step, setStep] = useState(0);
    const handleSubmit = () => {
        let i = 0;
        if (completedRef.current.length !== 12) return false;
        for (i = 0; i < completedRef.current.length; i++) if (!completedRef.current[i]) return false
        if (i === completedRef.current.length) return true;
    };
    // useEffect(() => console.warn(completedRef.current), [completedRef.current.length]);
    return (
        <>
            <Text style={styles.title}>Adicionar um cartão</Text>
            {formItems.slice(step * 3, step * 3 + 3).map(({ placeholder, error, validator, key, maxLength, transform }, i) =>
                <CreditCardFormItem
                    onComplete={(value, index) => {
                        setItemCompleted(value, i + step * 3)
                    }}
                    maxLength={maxLength}
                    transform={transform}
                    index={i}
                    placeholder={placeholder}
                    error={error}
                    onChange={(value) => {
                        if(value) setCardInfo({ ...cardInfo, [`${key}`]: value })
                    }}
                    //     if (value) cardInfoRef.current = { ...cardInfoRef.current, value };
                    validator={validator}
                />
                )}
            <PrimaryButton
                onPress={() => {
                    if (step > 1) {
                        if (handleSubmit())
                            onSubmit({
                                number: cardInfo.number,
                                cvv: cardInfo.cvv,
                                expMonth: cardInfo.month,
                                expYear: cardInfo.year,
                                name: cardInfo.name,
                                street: cardInfo.street,
                                document: cardInfo.document,
                                addressNumber: cardInfo.addressNumber,
                                district: cardInfo.district,
                                city: cardInfo.city,
                                state: cardInfo.state,
                            });
                    }
                    if (
                        (step === 0 && completedRef.current.length === 3 && completedRef.current[2])
                        || (step === 1 && completedRef.current.length === 6 && completedRef.current[5])
                        || (step === 2 && completedRef.current.length === 9 && completedRef.current[8])
                    ) setStep(step + 1);
                }}
                label={step > 2 ? "Adicionar o cartão" : 'Próximo'}
            />
        </>
    );
};

const CreditCardFormItem = ({ error, placeholder, validator, onComplete, index, onChange, maxLength, transform }) => {
    const [showError, setShowError] = useState(false);
    const [value, setValue] = useState('');
    const handleOnChangeValue = (v) => {
        if (typeof transform === 'function') v = transform(v);
        setShowError(!validator(v));
        onChange(v)
        setValue(v)
        onComplete(validator(v), index);
    };

    // console.warn(validator(v))
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                onChangeText={(v) => handleOnChangeValue(v)}
                style={styles.input}
                value={value}
                maxLength={maxLength}
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
        maxLength: 22,
    },
    {
        placeholder: 'Nome impresso',
        key: 'name',
        transform: v => v.toUpperCase(),
        error: 'Insira o nome impresso no cartão',
        validator: (v) => (/^[a-zA-Z ]+$/).test(v),
        maxLength: 30,
    },
    {
        key: 'cvv',
        placeholder: 'Código de segurança',
        error: 'Insira o código de segurança',
        validator: (v) => /^[0-9]+$/.test(v),
        maxLength: 4,
    },
    {
        key: 'month',
        placeholder: 'Mês de vencimento (dois dígitos)',
        error: 'Insira dois dígitos do mês de vencimento',
        validator: (v) => v.length === 2
            && /^[0-9]/.test(v)
            && Number(v) < 13
            && Number(v) > 0,
        maxLength: 2,
    },
    {
        key: 'year',
        placeholder: 'Ano de vencimento (quatro dígitos)',
        error: 'Insira quatro dígitos do ano de vencimento',
        validator: (v) => v.length === 4
        && /^[0-9]/.test(v)
        && Number(v) > 2019
        && Number(v) < 2040,
        maxLength: 4,
    },
    {
        key: 'document',
        placeholder: 'CPF',
        error: 'Insira um documento válido',
        maxLength: 11,
        validator: (v) => v.length === 11
    },
    {
        key: 'street',
        placeholder: 'Rua',
        error: 'Insira o nome da rua',
        validator: (v) => v,
        maxLength: 30,
    },
    {
        key: 'postalCode',
        placeholder: 'CEP',
        error: 'Insira o CEP',
        validator: (v) => v,
        maxLength: 8,
    },
    {
        key: 'addressNumber',
        placeholder: 'Número',
        error: 'Insira um número válido',
        validator: (v) => /^[0-9]/.test(v) ,
        maxLength: 10,
    },
    {
        key: 'district',
        placeholder: 'Bairro',
        error: 'Insira um bairro',
        validator: (v) => v,
        maxLength: 30,
    },
    {
        key: 'city',
        placeholder: 'Cidade',
        error: 'Insira a cidade',
        validator: (v) => v,
        maxLength: 30,
    },
    {
        key: 'state',
        placeholder: 'Estado',
        error: 'Insira o estado',
        transform: v => v.toUpperCase(),
        validator: (v) => (/^[a-zA-Z]+$/).test(v),
        maxLength: 2,
    },
]

export default CreditCardForm;
