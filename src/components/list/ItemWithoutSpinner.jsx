import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Avatar from '../list/Avatar';
import { COLORS } from '../../constants';
import { Column, Row } from '../layout';

const ItemWithoutSpinner = ({ id, ageRestricted, imageUrl, name, stockQty, qty, price, style, addToCart, }) => {
    
    return (
        <View style={{...styles.container, ...style}}>
            <Row style={styles.content}>
                <Avatar style={styles.avatar} src={imageUrl}/>
                <Text style={{ ...styles.description, ...styles.text }} numberOfLines={3}>{name}</Text>
                <Column style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={{ ...styles.price, ...styles.text }}>R$ {price}</Text>
                    <Text style={{ ...styles.price, ...styles.text }}>{qty} {qty > 1 ? 'unidades' : 'unidade'}</Text>
                </Column>
            </Row>
            <View style={styles.divider} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        // maxWidth: '80%',
        maxHeight: 250,
      },
    divider: {
        borderWidth: 1,
        marginVertical: 10,
        width: '100%',
        borderColor: COLORS.lightGray,
    },
    description: {
        fontSize: 14,
        maxWidth: '45%',
        color: COLORS.darkestGray,
      },
      price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primary,
      },
      text: {
        marginLeft: 5,
      }
});

export default ItemWithoutSpinner;