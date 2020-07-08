import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { COLORS } from '../../constants';
import { Row } from '../layout';

const Spinner = ({ onUpdateValue, stockQty, value, setValue, small = false, minQty = 1 }) => {
    const handleOnPressAdd = () => {
        if (value + 1 <= stockQty) setValue(value + 1)
    }
    const handleOnPressSubtract = () => {
        if (value - 1 >= minQty) setValue(value - 1)
    }
    return(<Row style={{ marginBottom: 10 }}>
        <TouchableHighlight style={[
            styles.button,
            value <= minQty && styles.disabledButton,
            small && {
                height: 20,
                width: 20
            },
        ]}
            onPress={() => handleOnPressSubtract()}
            disabled={value <= minQty}
        >
            <Text style={[
                styles.sign,
                value <= minQty && styles.disabledSign,
                small && {
                    fontSize: 22,
                    lineHeight: 25,
                },
            ]}>-</Text>
        </TouchableHighlight>
        <Text style={[
            styles.quantity,
            small && { marginHorizontal: 5 },
        ]}>
                {Number(value) < 9 ? '0' : ''}{value}un
            </Text>
        <TouchableHighlight
            disabled={value >= stockQty}
            style={[
                styles.button,
                value >= stockQty && styles.disabledButton,
                small && {
                    height: 20,
                    width: 20
                },
            ]}
            onPress={() => handleOnPressAdd()}
        >
            <Text style={[
                styles.sign,
                value >= stockQty && styles.disabledSign,
                small && {
                    fontSize: 22,
                    lineHeight: 25,
                },    
            ]}>+</Text>
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
    canceledText: {
        textDecorationLine: 'line-through',
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