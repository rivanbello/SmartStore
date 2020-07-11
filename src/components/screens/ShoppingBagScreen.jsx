import React, { useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import Screen from '../screens/Screen';
import ItemWithSpinner from '../list/ItemWithSpinner';
import { ShoppingBagFooter } from '../footers';
import { UserContext } from '../../context';
import { StackHeader } from '../headers';
import { COLORS } from '../../constants';

const ShoppingBagScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useContext(UserContext);
    const addToCart = ({ 
        updatedQty,
        imageUrl,
        name,
        price,
        qty,
        qtyToAdd,
        ageRestricted,
        id,
    }) => {
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
        let index = undefined;
        itemsUpdated.forEach((item, i) => { if(item.id === id) index = i })
        if (index !== undefined) itemsUpdated[index] = { ...itemToAdd, qty: updatedQty }
        else itemsUpdated = itemsUpdated.concat(itemToAdd);
        const totalItems = itemsUpdated.reduce((a, { qty: b }) => a + b, 0);
        setUserInfo({
            ...userInfo,
            cart: {
              ...userInfo.cart,
              items: itemsUpdated,
              totalItems,
            },
        });
    }
    return (
        <Screen>
            <StackHeader
                showShoppingBag={false}
                handleGoBack={() => navigation.goBack()}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, marginVertical: 25 }}>Sua sacola de compras</Text>
            {userInfo.cart.items.length > 0 && <>
                <ScrollView
                    style={{ maxHeight: '60%', flexGrow: 0 }}
                >
                {userInfo.cart.items.map(({
                    imageUrl,
                    name,
                    stockQty,
                    price,
                    qty,
                    ageRestricted,
                    id,
                }) =>
                    <ItemWithSpinner
                        imageUrl={imageUrl}
                        ageRestricted={ageRestricted}
                        name={name}
                        stockQty={stockQty}
                        price={price}
                        qty={qty}
                        ageRestricted={ageRestricted}
                        id={id}
                        addToCart={addToCart}
                    />
                )}
                </ScrollView>
                <ShoppingBagFooter
                    onPress={() => navigation.navigate('Checkout')}
                    onPressLink={() => navigation.goBack()}
                />
            </>
            }


        </Screen>
    );
};

export default ShoppingBagScreen;