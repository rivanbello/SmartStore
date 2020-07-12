import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, StyleSheet, View, Animated, BackHandler, TouchableWithoutFeedback } from 'react-native';
import Screen from '../screens/Screen';
import ItemWithoutSpinner from '../list/ItemWithoutSpinner';
import { CheckoutFooter } from '../footers';
import { UserContext } from '../../context';
import { StackHeader } from '../headers';
import { COLORS } from '../../constants';
import BottomDrawer from '../drawers/BottomDrawer';
import * as SecureStore from 'expo-secure-store';
import pay from '../../client/pay';

const CheckoutScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useContext(UserContext);
    const [drawerIsOpened, setDrawerIsOpened] = useState(false);
    const [height] = useState(new Animated.Value(0));
    const [card, setCard] = useState({});
    const getCard = useCallback(async () => {
        const card = (await SecureStore.getItemAsync('qwe'));
        setCard(JSON.parse(card));
    }, []);

    const removeCard = useCallback(async () => {
        setCard({});
    }, []);
    const saveCard = useCallback(async ({ number, cvv, expMonth, expYear, name, document, brand, street, addressNumber, district, city, state }) => {
        const cardToSave = {
            number,
            cvv,
            document,
            expMonth,
            expYear,
            name,
            brand,
            street,
            addressNumber,
            district,
            city,
            state,
        };
        await SecureStore.setItemAsync('qwe', JSON.stringify(cardToSave));
        setCard(cardToSave)
    } , []);
  useEffect(() => { getCard() }, [])

    const getTotalAmount = () => 
        userInfo.cart.items
            .filter(({ qty }) => qty > 0)
            .reduce((a, {
                price,
                qty,
            }) => a + (price * qty), 0)

    useEffect(() => {
        // if (drawerIsOpened) {
            // BackHandler.addEventListener('hardwareBackPress', function() {
            //     setDrawerIsOpened(false);
            //     return true; //disable default BackHandler behavior
            // });
            Animated.timing(height, { toValue: 280, duration: 300 }).start()
        // } else { 
        //     BackHandler.addEventListener('hardwareBackPress', function() { navigation.goBack(); BackHandler.removeEventListener('hardwareBackPress'); } )
        //     height.setValue(0);
        // }
    
}, [drawerIsOpened])

const handleOnPress = useCallback(async () => {
    try {
        const res = await pay({
            amount: getTotalAmount(),
            birthDate: getBirthDate(),
            cardCvv: userInfo.card(card.cvv),
            cardExpirationMonth: card.month,
            cardExpirationYear: card.year,
            documentNumber: card.documentNumber,
            documentType: 'CPF',
            cardHolderCPF: card.document,
            cardHolderName: card.name,
            cardNumber: card.number,
            city: card.city,
            district: card.district,
            number: card.addressNumber,
            phoneAreaCode: userInfo.phoneAreaCode.slice(0, 2),
            phoneNumber: userInfo.phoneNumber.slice(2),
            postalCode: card.postalCode,
            senderEmail: userInfo.email,
            senderName: card.name,
            state: card.state,
            street: card.street,
        })
    } catch (e) {

    }
}, [])

    return (
        <Screen>
            {console.warn(card)}
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
            {userInfo.cart.items
            .filter(({ qty }) => qty > 0)
            .map(({
                imageUrl,
                name,
                price,
                qty,
                ageRestricted,
                id,
            }) =>
                <ItemWithoutSpinner
                    imageUrl={imageUrl}
                    name={name}
                    qty={qty}
                    price={price * qty}
                    ageRestricted={ageRestricted}
                    id={id}
                />
            )}
            </ScrollView>
            <CheckoutFooter
            getCard={() => getCard()}
            card={card}
            removeCard={() => removeCard()}
            setDrawerIsOpened={() => {
                    setDrawerIsOpened(!drawerIsOpened);
                }}
                total={getTotalAmount()}
            />
            {drawerIsOpened && <BottomDrawer height={height} saveCard={saveCard} onFormSubmit={() => setDrawerIsOpened(false)} />}
        </Screen>
    );
};

export default CheckoutScreen;