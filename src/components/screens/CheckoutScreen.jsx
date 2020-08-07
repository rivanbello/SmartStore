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
import CreditCardForm from '../forms/CreditCardForm';

const CheckoutScreen = ({ navigation, setError = () => {}, setSuccess = () => {} }) => {
    const [userInfo, setUserInfo] = useContext(UserContext);
    const [cartInfo, setCartInfo] = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const [drawerIsOpened, setDrawerIsOpened] = useState(false);
    const [height] = useState(new Animated.Value(0));
    const [currentCard, setCurrentCard] = useState({});
    const [showCardForm, setShowCardForm] = useState(false);
    const [storedCards, setStoredCards] = useState([]);

    useEffect(() => {
        SecureStore.getItemAsync('qwe')
            .then(cards => {
                    let aux = JSON.parse(cards)
                    if (aux) {
                        setStoredCards(aux)
                        cards.length > 0 && setCurrentCard(aux[0])
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
        console.warn(aux)
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
        // if (!cardNumber) return;
        // let aux = storedCards.filter((card) => card.number !== cardNumber);
        // await storeCards(aux);
        // setCurrentCard(aux[0]);
        // setSuccess('O cartão foi removido com sucesso!');
        setCurrentCard({})
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
        <>
        {!showCardForm &&
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
                card={currentCard}
                removeCard={() => removeCard()}
                onPress={() => {
                    if (currentCard) setDrawerIsOpened(!drawerIsOpened);
                    else setShowCardForm(true);
                }}
                total={getTotalAmount()}
            />
            {drawerIsOpened &&
                <BottomDrawer
                    currentCard={currentCard}
                    setShowCardForm={setShowCardForm}
                    cards={storedCards}
                    height={height}
                    onFormSubmit={() => setDrawerIsOpened(false)}
                    removeCard={removeCard}
                    setCurrentCard={(v) => {
                        setCurrentCard(v)
                        setDrawerIsOpened(false)
                    }}
                />}
        </Screen>}
        {showCardForm && <CreditCardForm
            handleGoBack={() => setShowCardForm(false)}
            saveCard={saveCurrentCard}
        />}
        </>
    );
};

export default CheckoutScreen;