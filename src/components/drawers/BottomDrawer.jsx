import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SCREEN_WIDTH } from '../../constants';
import CreditCardForm from '../forms/CreditCardForm';

const BottomDrawer = ({ children }) => {
    return (
        <View style={styles.container}>
            <CreditCardForm />
        </View>
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