import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { COLORS } from '../../constants';
import { Row } from '../layout';

const Spinner = ({ onUpdateValue, stockQty, value, setValue }) => {
    const handleOnPressAdd = () => {
        if (value + 1 <= stockQty) setValue(value + 1)
    }
    const handleOnPressSubtract = () => {
        if (value - 1 >= 1) setValue(value - 1)
    }
    return(<Row style={{ marginBottom: 10 }}>
        <TouchableHighlight style={[styles.button, value <= 1 && styles.disabledButton]}
            onPress={() => handleOnPressSubtract()}
            disabled={value <= 1}
        >
            <Text style={[styles.sign, value <= 1 && styles.disabledSign]}>-</Text>
        </TouchableHighlight>
        <Text style={styles.quantity}>{Number(value) < 9 ? '0' : ''}{value}un</Text>
        <TouchableHighlight
            disabled={value >= stockQty}
            style={[styles.button, value >= stockQty && styles.disabledButton]}
            onPress={() => handleOnPressAdd()}
        >
            <Text style={[styles.sign, value >= stockQty && styles.disabledSign]}>+</Text>
        </TouchableHighlight>
    </Row>);
};

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sign: {
        fontSize: 36,
        color: 'white',
    },
    disabledButton: {
        backgroundColor: COLORS.lightGray,
    },
    disabledSign: {
        color: COLORS.gray,
    },
    quantity: {
        marginHorizontal: 20,
    },
});

export default Spinner;