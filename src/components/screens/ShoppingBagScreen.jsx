import React, { useContext } from 'react';
import Screen from '../screens/Screen';
import ItemWithSpinner from '../list/ItemWithSpinner';
import { UserContext } from '../../context';
import { StackHeader } from '../headers';

const ShoppingBagScreen = ({ navigation }) => {
    const [userInfo] = useContext(UserContext);
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
                />
            )}
        </Screen>
    );
};

export default ShoppingBagScreen;