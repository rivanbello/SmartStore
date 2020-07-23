import React, { useCallback, useEffect } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { SCREEN_WIDTH } from '../../constants';
import CreditCardForm from '../forms/CreditCardForm';

const BottomDrawer = ({ children, height, onFormSubmit, saveCard }) => {
    
    return (
        <Animated.View style={{ ...styles.container, height: height }}>
            <CreditCardForm
                onSubmit={(card) => { saveCard(card); onFormSubmit()} }
            />
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