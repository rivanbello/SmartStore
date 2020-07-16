import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, StyleSheet, View, Animated, TouchableWithoutFeedback } from 'react-native';
import Screen from '../screens/Screen';
import ItemWithoutSpinner from '../list/ItemWithoutSpinner';
import { CheckoutFooter } from '../footers';
import { getBirthDate } from '../../utils';
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

const handleOnPress = useCallback(async ({
    amount,
    birthDate,
    cardCvv,
    cardExpirationMonth,
    cardExpirationYear,
    documentNumber,
    documentType,
    cardHolderCPF,
    cardHolderName,
    cardNumber,
    city,
    district,
    number,
    phoneAreaCode,
    phoneNumber,
    postalCode,
    senderEmail,
    senderName,
    state,
    street,
}) => {
    try {
        const items = userInfo.cart.items.map(({ price, qty: quantity, id: productId }) => ({
            productId,
            quantity,
            price: 0.10,
        }));
        const res = await pay({
            amount: 0.20,
            pointOfSaleId: userInfo.condo.id,
            pointOfSaleToken: userInfo.condo.token,
            items,
            birthDate,
            cardCvv,
            cardExpirationMonth,
            cardExpirationYear,
            documentNumber,
            documentType,
            cardHolderCPF,
            cardHolderName,
            cardNumber,
            city,
            district,
            number,
            phoneAreaCode,
            phoneNumber,
            postalCode,
            senderEmail,
            senderName,
            state,
            street,
        })
        // console.warn('pay res: ', res);
        navigation.navigate('PaymentConfirmed')
    } catch (e) {
        navigation.navigate('PaymentError');
    }
}, [])

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
            {console.warn('card', card)}
            <CheckoutFooter
                getCard={() => getCard()}
                onPress={() => card && handleOnPress({
                    amount: getTotalAmount(),
                    // birthDate: getBirthDate(new Date(userInfo.nascimento.seconds * 1000)),
                    birthDate: getBirthDate(new Date('1995-12-17T03:24:00')),
                    cardCvv: card.cvv,
                    cardExpirationMonth: card.expMonth,
                    cardExpirationYear: card.expYear,
                    documentNumber: card.document,
                    documentType: 'CPF',
                    cardHolderCPF: card.document,
                    cardHolderName: card.name,
                    cardNumber: card.number,
                    city: card.city,
                    district: card.district,
                    number: card.addressNumber,
                    phoneAreaCode: userInfo.telefone.slice(0, 2),
                    phoneNumber: userInfo.telefone.slice(2),
                    postalCode: card.postalCode,
                    senderEmail: userInfo['e-mail'],
                    senderName: card.name,
                    state: card.state,
                    street: card.street,
            })}
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