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

const ItemWithSpinner = ({ id, ageRestricted, imageUrl, name, stockQty, qty, price, style, onPress }) => {
    
    const [qtyToAdd, setQtyToAdd] = useState(qty);
    const [userInfo, setUserInfo] = useContext(UserContext);
    const addToCart = (updatedQty) => {
        const itemToAdd = {
            imageUrl,
            name,
            price,
            stockQty: qty,
            qty: qtyToAdd,
            ageRestricted,
            id,
          };
        let itemsUpdated = userInfo.cart.items;
        let index;
        itemsUpdated.forEach((item, i) => { if(item.id === id) index = i })
        if (index) itemsUpdated[index] = { ...itemToAdd, qty: updatedQty }
        else itemsUpdated = itemsUpdated.concat(itemToAdd);
        setUserInfo({
            ...userInfo,
            cart: {
              ...userInfo.cart,
              items: itemsUpdated,
            },
        });
    }
    return (
        <View onPress={onPress} style={{...styles.container, ...style}}>
            <Row style={styles.content}>
                <Avatar style={styles.avatar} src={imageUrl}/>
                <Text style={{ ...styles.description, ...styles.text }} numberOfLines={3}>{name}</Text>
                <Column style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text style={{ ...styles.price, ...styles.text }}>R$ {price}</Text>
                    <Spinner
                        small
                        stockQty={stockQty}
                        value={qtyToAdd}
                        setValue={(value) => {
                            setQtyToAdd(value)
                            addToCart(value);
                        }}
                    />
                </Column>
            </Row>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
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