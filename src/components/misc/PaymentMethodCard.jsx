import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import { Row, Column } from '../layout';
import { Link } from '../buttons';
import { AntDesign } from '@expo/vector-icons';

const PaymentMethodCard = ({ card = {}, setDrawerIsOpened, removeCard }) => {
    return (
        card && card.number && <Row style={styles.container}>
            <AntDesign
                name={'creditcard'}
                size={30}
                color={COLORS.primary}
            />
            <Column style={styles.textsContainer}>
                <Text style={styles.cardName}>{card.name}</Text>
                <Text style={styles.cardNumber}>•••• {card.number.substring(card.number.length - 4)}</Text>
            </Column>
            <Link
                onPress={() => {}}
                label="Remover"
                labelStyle={{ color: COLORS.primary, fontSize: 14 }}
                onPress={() => removeCard()}
            />
        </Row>
        || <TouchableOpacity
            onPress={() => setDrawerIsOpened()}
        >
            <Row style={{ ...styles.container, justifyContent: 'flex-start' }}>
                <AntDesign
                    name={'creditcard'}
                    size={30}
                    color={COLORS.primary}
                />
                <Link
                    onPress={() => setDrawerIsOpened()}
                    label="Adicionar um cartão de crédito"
                    labelStyle={{ color: COLORS.primary, fontSize: 14, marginLeft: 10 }}
                />
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

export default PaymentMethodCard;