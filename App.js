require('./src/firebase');
import React, { useState, useEffect, useCallback } from 'react';
import * as Sentry from "sentry-expo";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { login } from './src/auth';
import { getTokens } from './src/firebase';
import pointsOfSale from './src/client/pointsOfSale';
import { AsyncStorage } from 'react-native';
import Screens from './src/components/screens';
import { loadCondos } from './src/utils/condoHelpers';
import { getProductsAndCategories } from './src/utils/products';
import { checkNetworkStatus, monitorNetworkStatus } from './src/network';
import { UserContext, CartContext, AuthenticationContext } from './src/context';
import {
  Foundation,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { COLORS } from './src/constants';

Sentry.init({
  dsn: "https://0e53614aa30d4eef8be38c058ddbdf0a@o372799.ingest.sentry.io/5400308",
  enableInExpoDevelopment: true,
  debug: true,
});

const Stack = createStackNavigator();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function App() {
  const [userInfo, setUserInfo] = useState({ condos: [] });
  const [cartInfo, setCartInfo] = useState({ items: [] });
  const [isLogged, setIsLogged] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const autoLogin = useCallback(async ({ username, password, condos = [] } = {}) => {
    let storedInfo = {};
    if (!username || !password) {
      storedInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
      if (storedInfo && storedInfo.email && storedInfo.senha) {
        username = storedInfo.email;
        password = storedInfo.senha;
      } else {
        setIsLoading(false);
        return;
      }
    }
    try {
      const {
        name: nome,
        phoneNumber: telefone,
        birthDate: nascimento,
        machineCompanyCode,
        email,
        condoId,
      } = await login({ email: username, password })
      const condo = condos.filter(({ machineCompanyCode: code }) => code === machineCompanyCode)[0] && condos.filter(({ machineCompanyCode: code }) => code === machineCompanyCode)[0] || {};
      const newUserInfo = {
        ...userInfo,
        nome,
        telefone,
        nascimento,
        condo: {
          ...userInfo.condo,
          name: condo.name,
          token: condo.token,
          machineCompanyCode,
          id: condoId,
        },
        email,
        senha: password,
        logged: true,
      };
      setUserInfo(newUserInfo);
      setIsLogged(true);
      try {
        await AsyncStorage.setItem('userInfo', JSON.stringify(newUserInfo))
      } catch (error) {
        setError(error.message)
      }
    } catch (e) {
      console.warn('catch error: ', e)
      setError(e.message)
    }
    finally{
      console.warn('setting loading to false')
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    // console.disableYellowBox = true;
    checkNetworkStatus()
      .then(status => {
        if(!status) {
          setNetworkStatus(status);
          setIsLoading(false);
          setError('Sem conexão com a internet!')
        }
      });
    monitorNetworkStatus((status) => setNetworkStatus(status));
    getTokens()
      .then(tokens => {
        pointsOfSale({ tokens })
          .then(response => {
            const condos = loadCondos(response);
            const newUserInfo = { ...userInfo, condos };
            setUserInfo(newUserInfo);
            autoLogin({ condos });
            return newUserInfo;
          })
        }
  )}, []);
  
  useEffect(() => {
    if (userInfo.condo && userInfo.condo.token)
      getProductsAndCategories({ pointOfSaleId: userInfo.condo.id, token: userInfo.condo.token })
        .then((res) => {
          const { products: availableProducts, categories } = res;
          const newUserInfo = { ...userInfo, availableProducts, categories };
          setUserInfo(newUserInfo)
        })
    }, [userInfo.condo]);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <Screens.SplashScreen />;
  }

  return (
    <NavigationContainer>
        <UserContext.Provider value={[userInfo, setUserInfo]}>
          <AuthenticationContext.Provider value={[isLogged, setIsLogged]}>
            <CartContext.Provider value={[cartInfo, setCartInfo]}>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Screens.LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Screens.RegisterScreen} options= {{ headerShown: false }} />
                <Stack.Screen name="Navigator" component={AppNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Product" component={Screens.ProductScreen} options={{ headerShown: false }} />
                <Stack.Screen name="RegisterConfirmation" component={Screens.RegisterConfirmationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Category" component={Screens.CategoryScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Checkout" component={Screens.CheckoutScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Suggestion" component={Screens.SuggestionScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Info" component={Screens.InformationScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="FeedbackConfirmation" component={Screens.FeedbackConfirmationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ResetPassword" component={Screens.ResetPasswordScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ShoppingBag" component={Screens.ShoppingBagScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PasswordFeedback" component={Screens.PasswordFeedbackScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentConfirmed" component={Screens.PaymentConfirmedScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PaymentError" component={Screens.PaymentErrorScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
            </CartContext.Provider>
          </AuthenticationContext.Provider>
        </UserContext.Provider>
    </NavigationContainer>
  );
}

const AppNavigator = () => <Tab.Navigator
    screenOptions={MainTabScreenOptions}
    tabBarOptions={MainTabBarOptions}
    >
      <Tab.Screen
        name="Home"
        component={Screens.HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Info" component={Screens.InformationScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Perfil" component={Screens.ProfileScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>

const MainTabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    let IconFamily;
    if (route.name === 'Home') {
      IconFamily=Foundation;
      iconName = 'home'
    } else if (route.name === 'Info') {
      IconFamily = AntDesign;
      iconName = 'questioncircle';
    } else if (route.name === 'Perfil') {
      IconFamily = Ionicons;
      iconName = 'md-person';
    } else return;
    return <IconFamily
        name={iconName}
        size={route.name == 'Info' ? size - 3 : size}
        color={color}
      />;
  },
});

const MainTabBarOptions = {
  activeTintColor: COLORS.primary,
  inactiveTintColor: COLORS.lilac,
  labelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
};

const confirmationScreenProps = {
  title: 'Perfeito',
  description: 'Agora você pode aproveitar a experiência de comprar da forma mais confortável',
  buttonLabel: 'Finalizar cadastro',
  Icon: {
    family: MaterialCommunityIcons,
    size: 200,
    name: 'check-circle',
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 25,
//   },
// });