import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, StyleSheet, View, Animated, TouchableWithoutFeedback } from 'react-native';
import Screen from '../screens/Screen';
import ItemWithoutSpinner from '../list/ItemWithoutSpinner';
import { CheckoutFooter } from '../footers';
import { getBirthDate } from '../../utils';
import { UserContext, CartContext } from '../../context';
import { StackHeader } from '../headers';
import { COLORS } from '../../constants';
import BottomDrawer from '../drawers/BottomDrawer';
import * as SecureStore from 'expo-secure-store';
import pay from '../../client/pay';

const CheckoutScreen = ({ navigation, setError = () => {}, setSuccess = () => {} }) => {
    const [userInfo, setUserInfo] = useContext(UserContext);
    const [cartInfo, setCartInfo] = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const [drawerIsOpened, setDrawerIsOpened] = useState(false);
    const [height] = useState(new Animated.Value(0));
    const [currentCard, setCurrentCard] = useState({});
    const [storedCards, setStoredCards] = useState([]);

    useEffect(() => {
        SecureStore.getItemAsync('qwe')
            .then(cards => {
                    let aux = JSON.parse(cards)
                    if (aux) {
                        setStoredCards(JSON.parse(cards))
                        setCurrentCard((JSON.parse(cards))[0])
                    }
                }
            );
    }, []);

    const storeCards = useCallback(async (cards) => {
        if (Array.isArray(cards)) {
            await SecureStore.setItemAsync('qwe', JSON.stringify(cards))
            setStoredCards(cards);
        }
    }, []);

    const saveCurrentCard = useCallback(async (card) => {
        let aux = storedCards;
        if (aux.filter(({ number }) => number === card.number).length > 0) {
            setError('Este cartão já foi adicionado.')
            return;
        }
        aux.unshift(card);
        await storeCards(aux);
        setCurrentCard(card);
        setSuccess('O cartão foi adicionado com sucesso!');
    }, []);
    
    const removeCard = useCallback(async ({ cardNumber } = {}) => {
        if (!cardNumber) return;
        let aux = storedCards.filter((card) => card.number !== cardNumber);
        await storeCards(aux);
        setCurrentCard(aux[0]);
        setSuccess('O cartão foi removido com sucesso!');
    }, []);


    const getTotalAmount = () => 
        cartInfo.items
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
            Animated.timing(height, { toValue: 320, duration: 300 }).start()
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
        const items = cartInfo.items
        .filter(({ qty }) => qty > 0)
        .map(({ price, qty: quantity, id: productId }) => ({
            productId,
            quantity,
            price,
        }));
        setLoading(true);
        const res = await pay({
            amount,
            pointOfSaleId: userInfo.condo.id,
            pointOfSaleToken: userInfo.condo.token,
            birthDate,
            items,
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
            senderEmail: userInfo.email,
            senderName,
            state,
            street,
        });
        console.warn("res", res)
        setCartInfo({ ...cartInfo, cart: { items: [] } });
        navigation.navigate('PaymentConfirmed')
        setLoading(false);
    } catch (e) {
        navigation.navigate('PaymentError');
        console.warn("error", e)
        setLoading(false);
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
            {cartInfo.items
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
                loading={loading}
                onPress={() => currentCard && handleOnPress({
                    amount: getTotalAmount(),
                    // birthDate: getBirthDate(new Date(userInfo.nascimento.seconds * 1000)),
                    birthDate: getBirthDate(new Date('1995-12-17T03:24:00')),
                    cardCvv: currentCard.cvv,
                    cardExpirationMonth: currentCard.expMonth,
                    cardExpirationYear: currentCard.expYear,
                    documentNumber: currentCard.document,
                    documentType: 'CPF',
                    cardHolderCPF: currentCard.document,
                    cardHolderName: currentCard.name,
                    cardNumber: currentCard.number,
                    city: currentCard.city,
                    district: currentCard.district,
                    number: currentCard.addressNumber,
                    phoneAreaCode: userInfo.telefone.slice(0, 2),
                    phoneNumber: userInfo.telefone.slice(2),
                    postalCode: currentCard.postalCode,
                    senderEmail: userInfo.email,
                    senderName: currentCard.name,
                    state: currentCard.state,
                    street: currentCard.street,
            })}
            card={currentCard}
            removeCard={() => removeCard()}
            setDrawerIsOpened={() => {
                    setDrawerIsOpened(!drawerIsOpened);
                }}
                total={getTotalAmount()}
            />
            {drawerIsOpened && <BottomDrawer height={height} saveCard={saveCurrentCard} onFormSubmit={() => setDrawerIsOpened(false)} />}
        </Screen>
    );
};

export default CheckoutScreen;