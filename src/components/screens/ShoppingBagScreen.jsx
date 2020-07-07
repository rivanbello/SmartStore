import React, { useContext } from 'react';
import Screen from '../screens/Screen';
import ItemWithSpinner from '../list/ItemWithSpinner';
import { UserContext } from '../../context';
import { StackHeader } from '../headers';

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
        setUserInfo({
            ...userInfo,
            cart: {
              ...userInfo.cart,
              items: itemsUpdated,
            },
        });
    }
    return (
        <Screen>
            <StackHeader
                showShoppingBag={false}
                handleGoBack={() => navigation.goBack()}
            />
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
        </Screen>
    );
};

export default ShoppingBagScreen;