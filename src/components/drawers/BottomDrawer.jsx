import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { SCREEN_WIDTH } from '../../constants';
import CreditCardForm from '../forms/CreditCardForm';

const BottomDrawer = ({ children, height }) => {
    return (
        <Animated.View style={{ ...styles.container, height: height }}>
            <CreditCardForm />
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