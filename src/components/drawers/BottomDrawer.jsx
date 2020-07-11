import React, { useCallback } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { SCREEN_WIDTH } from '../../constants';
import CreditCardForm from '../forms/CreditCardForm';
import * as SecureStore from 'expo-secure-store';

const BottomDrawer = ({ children, height, onFormSubmit }) => {
    
const saveCard = useCallback(async ({ number, cvv, expMonth, expYear, name, document, brand, street, addressNumber, district, city, state }) => {
    let savedCards = JSON.parse(await SecureStore.getItemAsync('qwe'));
    if (!savedCards || !savedCards.length) savedCards = [];
    savedCards.push({
        number,
        cvv,
        document,
        expMonth,
        expYear,
        name,
        brand,
        street,
        addressNumber,
        district,
        city,
        state,
    });
    await SecureStore.setItemAsync('qwe', JSON.stringify(savedCards));
    console.warn(await SecureStore.getItemAsync('qwe'))
} , []);

    return (
        <Animated.View style={{ ...styles.container, height: height }}>
            <CreditCardForm onSubmit={(card) => { saveCard(card); onFormSubmit()} }/>
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
});

export default BottomDrawer;