import React, { useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { COLORS, SCREEN_WIDTH } from '../../constants';
import { validCreditCard } from './cardFormValidators';
import { PrimaryButton, Link } from '../buttons';
import { CreditCardContainer, AddNewCardContainer } from '../misc';
import SimpleModal from '../modal/SimpleModal';

const CardsDrawer = ({
        cards = [],
        onPressAddNewCard,
        height,
        selectedCardNumber,
        setCurrentCard,
        removeCard,
    }) => {
    const [selected, setSelected] = useState(cards.filter((card) => card.number === selectedCardNumber)[0] || {});
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <Animated.View style={{ ...styles.container, height: height }}>
            <Text style={styles.title}>Trocar o cartão</Text>
            {cards.map((card) => 
                <CreditCardContainer
                    card={card}
                    selected={selected.number === card.number}
                    onPress={() => setSelected(card)}
                />
            )}
            <AddNewCardContainer
                onPress={onPressAddNewCard}
            />
            <View style={styles.blankSpace} />
            {cards.length > 0 && selected &&
                <View style={styles.buttonsContainer}>
                    <PrimaryButton
                        onPress={() => {
                            setCurrentCard(selected)
                        }}
                        label={'Selecionar'}
                    />
                    <Link
                        onPress={() => setModalOpen(true)}
                        labelStyle={{ color: COLORS.primary }}
                        label={'Remover cartão'}
                    />
                </View>
            }
            {modalOpen && <SimpleModal
                title="Tem certeza que deseja remover este cartão?"
                style={{
                    top: '30%',
                    left: 20,
                    width: '100%',
                }}
                options={[
                    {
                        label: "Cancelar",
                        onPress: () => setModalOpen(false),
                    },
                    {
                        label: "Remover",
                        color: COLORS.primary,
                        onPress: () => {
                            removeCard({ cardNumber: selected && selected.number })
                            setModalOpen(false);
                        }
                    },
                ]}
            />}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        padding: 30,
        backgroundColor: '#fff',
    },
    buttonsContainer: {
        flex: 1,
        // backgroundColor: 'red',
    },
    title: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 16,
        marginBottom: 12,
    },
    blankSpace: {
        marginBottom: 10,
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
        placeholder: 'CPF',
        error: 'Insira um documento válido',
        maxLength: 11,
        validator: (v) => v.length === 11
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

export default CardsDrawer;
