import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView } from 'react-native';
import Screen from '../screens/Screen';
import { StackHeader } from '../headers';
import { COLORS } from '../../constants';
import { validCreditCard } from './cardFormValidators';
import { PrimaryButton } from '../buttons';

const CreditCardForm = ({ handleGoBack, saveCard }) => {
    const [cardInfo, setCardInfo] = useState({});
    const checkIfFormIsComplete = () => {
        const cardInfoArr = Object.values(cardInfo);
        let i = 0;
        if (cardInfoArr.length !== formItems.length) return false;
        for (i = 0; i < cardInfoArr.length; i++) if (!cardInfoArr[i]) return false
        if (i === cardInfoArr.length) return true;
    };
    return (
        <Screen>
            <StackHeader
                handleGoBack={() => handleGoBack()}
                showShoppingBag={false}
            />
            <ScrollView style={styles.container}>
            <Text style={styles.title}>Adicionar um cartão</Text>
            <Text style={styles.subtitle}>Insira todos os dados de acordo com o cadastro no banco que emitiu o cartão</Text>
            {formItems.map(({ placeholder, error, validator, key, maxLength, transform }, i) =>
                <CreditCardFormItem
                    maxLength={maxLength}
                    transform={typeof transform === 'function' && ((v) => transform(v))}
                    key={key}
                    index={i}
                    placeholder={placeholder}
                    error={error}
                    onChange={(value) => {
                        setCardInfo({ ...cardInfo, [`${key}`]: value })
                    }}
                    validator={validator}
                />
                )}
            <PrimaryButton
                disabled={!checkIfFormIsComplete()}
                onPress={() => {
                    if (checkIfFormIsComplete())
                        saveCard({
                            number: cardInfo.number,
                            cvv: cardInfo.cvv,
                            expMonth: cardInfo.month,
                            expYear: cardInfo.year,
                            name: cardInfo.name,
                            street: cardInfo.street,
                            postalCode: cardInfo.postalCode,
                            document: cardInfo.document,
                            addressNumber: cardInfo.addressNumber,
                            district: cardInfo.district,
                            city: cardInfo.city,
                            state: cardInfo.state,
                        })
                        .then(() => handleGoBack());
                }}
                label="Adicionar o cartão"
            />
        </ScrollView>
        </Screen>
    );
};

const CreditCardFormItem = ({ error, placeholder, validator, onChange, maxLength, transform }) => {
    const [showError, setShowError] = useState(false);
    const [value, setValue] = useState('');
    const handleOnChangeValue = (v) => {
        setShowError(!validator(v));
        onChange(v);
        setValue(v);
    };
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                autoCapitalize={(placeholder === 'Nome impresso' || placeholder === 'Estado') && 'characters'}
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
    container: {
        paddingVertical: 25,
    },
    title: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 16,
        marginBottom: 12,
    },
    subtitle: {
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 13,
        marginBottom: 12,
        color: COLORS.primary,
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
        key: 'document',
        placeholder: 'CPF do dono do cartão',
        error: 'Insira um documento válido',
        maxLength: 11,
        validator: (v) => v.length === 11
    },
    {
        placeholder: 'Data de nascimento',
        key: 'birthdate',
        // transform: v => v.toUpperCase(),
        error: 'Insira uma data válida no formato DD/MM/AAAA',
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
        key: 'street',
        placeholder: 'Logradouro',
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
        key: 'district',
        placeholder: 'Bairro',
        error: 'Insira um bairro',
        validator: (v) => v,
        maxLength: 30,
    },
    {
        key: 'addressNumber',
        placeholder: 'Número',
        error: 'Insira um número válido',
        validator: (v) => /^[0-9]/.test(v) ,
        maxLength: 10,
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