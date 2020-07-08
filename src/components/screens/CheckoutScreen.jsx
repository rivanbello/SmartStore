import React, { useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import Screen from '../screens/Screen';
import ItemWithoutSpinner from '../list/ItemWithoutSpinner';
import { CheckoutFooter } from '../footers';
import { UserContext } from '../../context';
import { StackHeader } from '../headers';
import { COLORS } from '../../constants';

const CheckoutScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useContext(UserContext);
    return (
        <Screen>
            <StackHeader
                showShoppingBag={false}
                handleGoBack={() => navigation.goBack()}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, marginVertical: 25 }}>Sua sacola de compras</Text>
            <ScrollView
                style={{ maxHeight: '60%', flexGrow: 0 }}
            >
            {userInfo.cart.items.map(({
                imageUrl,
                name,
                price,
                ageRestricted,
                id,
            }) =>
                <ItemWithoutSpinner
                    imageUrl={imageUrl}
                    name={name}
                    price={price}
                    ageRestricted={ageRestricted}
                    id={id}
                />
            )}
            </ScrollView>
            <CheckoutFooter />
        </Screen>
    );
};

export default CheckoutScreen;