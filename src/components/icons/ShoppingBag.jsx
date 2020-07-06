import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const ShoppingBag = ({ quantity }) => (
    <TouchableHighlight>
        <>
            <Entypo color="#fff" size={26} name="shopping-bag" />
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