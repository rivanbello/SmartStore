import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import { Row } from '../layout';
import { Link } from '../buttons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
    
const AddNewCardContainer = ({ card = {}, onPress, removeCard }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress()}
        >
            <Row style={{ ...styles.container, justifyContent: 'flex-start' }}>
                <MaterialCommunityIcons
                    name="shape-rectangle-plus"
                    size={30}
                    color={COLORS.primary}
                />
                <Link
                    onPress={() => onPress()}
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

export default AddNewCardContainer;