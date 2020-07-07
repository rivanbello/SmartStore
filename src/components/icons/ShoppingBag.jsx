import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { COLORS } from '../../constants';

const ShoppingBag = ({ quantity, header = false, handleOnPress }) => (
    <TouchableHighlight onPress={() => handleOnPress()}>
        <>
            <Entypo color={header ? COLORS.primary : "#fff"} size={26} name="shopping-bag" />
            {quantity > 0 && <View style={styles.shoppingBagInfo}>
                <Text style={styles.shoppingBagInfoText}>{quantity}</Text>
            </View>}
        </>
    </TouchableHighlight>
);

const styles = StyleSheet.create({
    shoppingBagInfo: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 17,
        borderRadius: 100,
        top: '30%',
        borderWidth: 1,
        borderColor: 'white',
        height: 17,
        position: 'absolute',
        left: '65%',
        zIndex: 10,
      },
      shoppingBagInfoText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
      },
});

export default ShoppingBag;