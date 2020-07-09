import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, Animated, BackHandler, TouchableWithoutFeedback } from 'react-native';
import Screen from '../screens/Screen';
import ItemWithoutSpinner from '../list/ItemWithoutSpinner';
import { CheckoutFooter } from '../footers';
import { UserContext } from '../../context';
import { StackHeader } from '../headers';
import { COLORS } from '../../constants';
import BottomDrawer from '../drawers/BottomDrawer';

const CheckoutScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useContext(UserContext);
    const [drawerIsOpened, setDrawerIsOpened] = useState(false);
    const [height] = useState(new Animated.Value(0));
    useEffect(() => {
        if (drawerIsOpened) {
            BackHandler.addEventListener('hardwareBackPress', function() {
                setDrawerIsOpened(false);
                return true; //disable default BackHandler behavior
            });
            Animated.timing(height, { toValue: 300, duration: 300 }).start()
        } else { 
            BackHandler.addEventListener('hardwareBackPress', function() { navigation.goBack(); BackHandler.removeEventListener('hardwareBackPress'); } )
            height.setValue(0);
        }
    
}, [drawerIsOpened])
    return (
        <Screen>
            {drawerIsOpened && <TouchableWithoutFeedback
                onPress={() => setDrawerIsOpened(!drawerIsOpened)}
            ><View style={{
                ...StyleSheet.absoluteFill,
                backgroundColor: 'rgba(251, 57, 75, 0.6)',
                zIndex: 5,
            }}/></TouchableWithoutFeedback>}
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
            <CheckoutFooter setDrawerIsOpened={() => {
                setDrawerIsOpened(!drawerIsOpened);
            }}/>
            {drawerIsOpened && <BottomDrawer height={height} />}
        </Screen>
    );
};

export default CheckoutScreen;