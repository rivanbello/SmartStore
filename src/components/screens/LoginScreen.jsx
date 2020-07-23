import React, { useEffect, useState, } from 'react';
import { LoginBackground, LoginLogo, LogoLogin } from '../../assets/images';
import { Image, View, Keyboard } from 'react-native';
import { TopAlert } from '../misc';
import { LoginForm } from '../forms';
import { COLORS } from '../../constants';
import Screen from './Screen'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants';

const LoginScreen = ({ navigation }) => {

  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', (e) => { setKeyboardOpen(true); setKeyboardHeight(e.endCoordinates.height) } );
    Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
  }, []);
  
  return (
    <Screen>
      <View style={{ flex: 1 }}>
      { ((keyboardOpen && SCREEN_HEIGHT > 550)
        || !keyboardOpen)
        && <Image
        style={styles.backgroundImage}
        source={LoginBackground}
      />}
      {!keyboardOpen
        && <Image
        source={LogoLogin}
        style={styles.logoImage} />
      }
      </View>
      <View style={{ minWidth: '33%' }}>
        <LoginForm navigation={navigation} />
      </View>
      { ((keyboardOpen && SCREEN_HEIGHT > 550)
        || !keyboardOpen)
        && <TopAlert
        firstLabel="Ainda não tem conta?"
        secondLabel=" Cadastre-se"
        style={{ top: 60 }}
        onPress={() => navigation.navigate('Register')}
      />
    }
    </Screen>
  )
}

const styles = {
  imageContainer: {
    
  },
  backgroundImage: {
    // width: SCREEN_WIDTH * 1.04,
    top: -30,
    height: 150,
    alignSelf: 'center',
    resizeMode: 'contain',
    // left: '-8%',
    marginBottom: '4%',
  },
  logoImage: {
    maxHeight: '60%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  icon: {
    color: COLORS.primary,
    flex: 1,
    alignSelf: 'center',
  }
}

export default LoginScreen;