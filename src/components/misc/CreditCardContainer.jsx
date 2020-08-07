import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import { Row, Column } from '../layout';
import { AntDesign } from '@expo/vector-icons';

const CreditCardContainer = ({ card = {}, onPress, removeCard }) => {
    return (
        card && card.number && <TouchableOpacity>
            <Row style={styles.container}>
            <AntDesign
                name={'creditcard'}
                size={30}
                color={COLORS.primary}
            />
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.cardNumber}>•••• {card.number.substring(card.number.length - 4)}</Text>
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
        textAlign: 'left',
    },
    cardNumber: {
        color: COLORS.darkestGray,
        textAlign: 'left',
    },
})

export default CreditCardContainer;