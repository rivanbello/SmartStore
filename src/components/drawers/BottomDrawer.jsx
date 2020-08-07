import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { SCREEN_WIDTH } from '../../constants';
import CardsDrawer from '../forms/CardsDrawer';

const BottomDrawer = ({ cards = [], height, onFormSubmit, setShowCardForm }) => {
    
    return (
        <Animated.View style={{ ...styles.container, height: height }}>
            <CardsDrawer
                onPressAddNewCard={() => setShowCardForm(true)}
                cards={cards}
                onSubmit={(card) => { onFormSubmit()} }
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        padding: 30,
        backgroundColor: '#fff',
    },
});

export default BottomDrawer;