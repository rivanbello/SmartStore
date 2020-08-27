import React from 'react';
import { Image, View } from 'react-native';
import Screen from './Screen';
import { SplashPNG } from '../../assets/images'
import { SCREEN_WIDTH } from '../../constants';

const SplashScreen = ({ label }) => (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        {/* <View style={{ flex: 1, backgroundColor: 'red'}}></View> */}
        <Image source={SplashPNG} style={{ width: SCREEN_WIDTH, height: 300 }} />
    </Screen>
)

export default SplashScreen;