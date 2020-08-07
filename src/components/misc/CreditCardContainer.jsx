import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import { Row } from '../layout';
import { AntDesign } from '@expo/vector-icons';

const CreditCardContainer = ({ card = {}, onPress, selected }) => {
    return (
        card && card.number &&
        <TouchableOpacity onPress={onPress}>
            <Row style={[
                styles.container,
                selected && styles.selectedContainer,
            ]}>
            <AntDesign
                name={'creditcard'}
                size={30}
                color={selected ? '#fff' : COLORS.primary}
            />
            <Text style={[ styles.cardName, selected && styles.selectedText ]}>{card.name}</Text>
            <Text style={[ styles.cardNumber, selected && styles.selectedText ]}>•••• {card.number.substring(card.number.length - 4)}</Text>
            </Row>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.lightLilac,
        height: 50,
        borderRadius: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    textsContainer: {
        alignItems: 'flex-start',
    },
    cardName: {
        color: COLORS.gray,
        textAlign: 'center',
        maxWidth: 120
    },
    cardNumber: {
        color: COLORS.darkestGray,
        textAlign: 'left',
    },
    selectedContainer: {
        backgroundColor: COLORS.primary,
    },
    selectedText: {
        color: 'white',
    }
})

export default CreditCardContainer;