import React, { useCallback } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { SCREEN_WIDTH } from '../../constants';
import CreditCardForm from '../forms/CreditCardForm';

const BottomDrawer = ({ children, height, onFormSubmit }) => {
    
const saveCard = useCallback(async ({ number, cvv, expMonth, expYear, name, brand , address }) => {
    let savedCards = JSON.parse(await SecureStore.getItemAsync('qwe'));
    if (!savedCards || !savedCards.length) savedCards = [];
    savedCards.push({
        number,
        cvv,
        expMonth,
        expYear,
        name,
        brand,
    });
    await SecureStore.setItemAsync('qwe', savedCards);
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