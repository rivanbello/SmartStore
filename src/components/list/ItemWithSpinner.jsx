import React, { useState, useContext } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Avatar from '../list/Avatar';
import { COLORS } from '../../constants';
import { Column, Row } from '../layout';
import Spinner from '../misc/Spinner';
import { UserContext } from '../../context';

const ItemWithSpinner = ({ id, ageRestricted, imageUrl, name, stockQty, qty, price, style, addToCart, }) => {
    
    const [qtyToAdd, setQtyToAdd] = useState(qty);
    const [userInfo, setUserInfo] = useContext(UserContext);
    return (
        <View style={{...styles.container, ...style}}>
            <Row style={styles.content}>
                <Avatar overlayImage src={imageUrl}/>
                <Text style={[styles.description, styles.text, qty === 0 && styles.canceledName]} numberOfLines={3}>{name}</Text>
                <Column style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={[styles.price, styles.text, qty === 0 && styles.canceledName]}>R$ {price}</Text>
                    <Spinner
                        small
                        stockQty={stockQty}
                        minQty={0}
                        value={qtyToAdd}
                        setValue={(value) => {
                            setQtyToAdd(value)
                            addToCart({
                                updatedQty: value,
                                imageUrl,
                                name,
                                price,
                                qty,
                                qtyToAdd,
                                ageRestricted,
                                id,
                            });
                        }}
                    />
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
    button: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        backgroundColor: COLORS.lightGray,
    },
    disabledSign: {
        color: COLORS.gray,
    },
    canceledName: {
        textDecorationLine: 'line-through',
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
      quantity: {
        fontSize: 12,
        color: COLORS.lilac,
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

export default ItemWithSpinner;