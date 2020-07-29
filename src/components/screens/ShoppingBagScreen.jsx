import React, { useContext, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Screen from '../screens/Screen';
import ItemWithSpinner from '../list/ItemWithSpinner';
import { ShoppingBagFooter } from '../footers';
import { UserContext, CartContext } from '../../context';
import { StackHeader } from '../headers';
import { COLORS } from '../../constants';
import SimpleModal from '../modal/SimpleModal';

const ShoppingBagScreen = ({ navigation }) => {
    const [userInfo] = useContext(UserContext);
    const [cartInfo, setCartInfo] = useContext(CartContext);
    const [resetModalOpen, setResetModalOpen] = useState(false);
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
        let itemsUpdated = cartInfo.items;
        let index = undefined;
        itemsUpdated.forEach((item, i) => { if(item.id === id) index = i })
        if (index !== undefined) itemsUpdated[index] = { ...itemToAdd, qty: updatedQty }
        else itemsUpdated = itemsUpdated.concat(itemToAdd);
        const totalItems = itemsUpdated.reduce((a, { qty: b }) => a + b, 0);
        setCartInfo({
            ...cartInfo,
            items: itemsUpdated,
            totalItems,
        });
    }
    const getTotalAmount = () => 
        cartInfo.items
            .filter(({ qty }) => qty > 0)
            .reduce((a, {
                price,
                qty,
            }) => a + (price * qty), 0)
    return (
        <Screen>
            <StackHeader
                showShoppingBag={false}
                handleGoBack={() => navigation.goBack()}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.primary, marginVertical: 25 }}>Sua sacola de compras</Text>
            {cartInfo.items.length > 0 && <>
                <ScrollView
                    style={{ maxHeight: '60%', flexGrow: 0 }}
                >
                {cartInfo.items.map(({
                    imageUrl,
                    name,
                    stockQty,
                    price,
                    qty,
                    ageRestricted,
                    id,
                }) =>
                {
                    return <ItemWithSpinner
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
                }
                )}
                </ScrollView>
                <ShoppingBagFooter
                    onPressResetCart={() => setResetModalOpen(!resetModalOpen)}
                    paymentEnabled={userInfo.condo && userInfo.condo.name === 'Cond. Life Space'}
                    onPress={() => navigation.navigate('Checkout')}
                    onPressLink={() => navigation.goBack()}
                    total={getTotalAmount()}
                />
                {resetModalOpen && <SimpleModal
                    title="Tem certeza que deseja esvaziar a sacola?"
                    style={{
                        top: '30%',
                        left: 20,
                        width: '100%',
                    }}
                    options={[
                        {
                            label: "Cancelar",
                            onPress: () => setResetModalOpen(false),
                        },
                        {
                            label: "Esvaziar",
                            color: COLORS.primary,
                            onPress: () => {
                                setCartInfo({
                                    ...cartInfo,
                                    items: [],
                                    totalItems: 0,
                                });
                                setResetModalOpen(false);
                            }
                        },
                    ]}
                />}
            </>
            }


        </Screen>
    );
};

export default ShoppingBagScreen;