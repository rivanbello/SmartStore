require('./src/firebase');
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import all from './src/client/list';
import { login } from './src/auth';
import { getTokens } from './src/firebase';
import pointsOfSale from './src/client/pointsOfSale';
import { AsyncStorage } from 'react-native';
import Screens from './src/components/screens';
import NetInfo from '@react-native-community/netinfo';
import { UserContext, CartContext } from './src/context';
import {
  Foundation,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { COLORS } from './src/constants';

const Stack = createStackNavigator();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function App() {
  const [userInfo, setUserInfo] = useState({ condos: [] });
  const [cartInfo, setCartInfo] = useState({ items: [] });
  const [networkStatus, setNetworkStatus] = useState(true);
  const autoLogin = useCallback(async ({ userInfo }) => {
    const storedInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
    if (storedInfo && storedInfo.email && storedInfo.senha) {
      try {
        const {
          name: nome,
          phoneNumber: telefone,
          birthDate: nascimento,
          machineCompanyCode,
          email,
          condoId,
        } = await login({ email: storedInfo.email, password: storedInfo.senha })
          const newUserInfo = {
            ...userInfo,
            nome,
            telefone,
            nascimento,
            condo: {
              ...userInfo.condo,
              name: userInfo && userInfo.condos && userInfo.condos.filter(({ machineCompanyCode: code }) => code === machineCompanyCode)[0] && userInfo.condos.filter(({ machineCompanyCode: code }) => code === machineCompanyCode)[0].name,
              token: userInfo && userInfo.condos && userInfo.condos.filter(({ machineCompanyCode: code }) => code === machineCompanyCode)[0] && userInfo.condos.filter(({ machineCompanyCode: code }) => code === machineCompanyCode)[0].token,
              machineCompanyCode,
              id: condoId,
            },
            email,
            senha: storedInfo.senha,
            logged: true,
          };
          await AsyncStorage.setItem('userInfo', JSON.stringify(newUserInfo))
          await setUserInfo(newUserInfo);
      } catch (error) {
        console.warn('auto login error: ', error);
        throw error;
      } finally {
      }
    }
  }, []);

  useEffect(() => {
    // console.disableYellowBox = true;
    console.warn('oi')
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setLoading(false);
        setError('Sem conexão com a internet!')
      }
    }).then(() => 
      NetInfo.addEventListener(state => {
        if(state.isConnected !== networkStatus) setNetworkStatus(state.isConnected);
      })
    );
    console.warn('oi')
    
    getTokens()
    .then(tokens =>
    pointsOfSale({ tokens }).then(response => {
      const condos = [];
      response.map((pos) => {
        const name = `Cond. ${pos.localName}`;
        let condoInfo = {};
        switch (pos.localName) {
          case 'Spazio Castellon':
            condoInfo.address ="R. Profa. Maria Pilar Bórgia, 215";
            condoInfo.neighborhood = "Vila Carminha, Campinas - SP";
            break;
          case 'Spazio Castellon PDV2':
            condoInfo.address ="R. Profa. Maria Pilar Bórgia, 215";
            condoInfo.neighborhood = "Vila Carminha, Campinas - SP";
            break;
          case 'Topazio Ville':
            condoInfo.address = 'Av. São José dos Campos, 150';
            condoInfo.neighborhood = "Jardim Nova Europa, Campinas - SP";
            break;
          case 'Topazio Ville PDV1':
            condoInfo.address = 'Av. São José dos Campos, 150';
            condoInfo.neighborhood = "Jardim Nova Europa, Campinas - SP";
            break;
          case 'Bairro Jardim Nova Europa':
            condoInfo.address = 'R. Manuel Sylvestre de Freitas Filho, 75',
            condoInfo.neighborhood = "Jardim Nova Europa, Campinas - SP";
            break;
          case 'Ametista Villa':
            condoInfo.address = 'Rua Manoel Silvestre de Freitas Filho, 1277';
            condoInfo.neighborhood = "Jardim Nova Europa, Campinas - SP";
            break;
          case 'Ametista Villa PDV2':
            condoInfo.address = 'Rua Manoel Silvestre de Freitas Filho, 1277';
            condoInfo.neighborhood = "Jardim Nova Europa, Campinas - SP";
            break;
          case 'Parque dos Alecrins':
            condoInfo.address = 'Av. Carlos Diaulas Serpa';
            condoInfo.neighborhood = 'Campinas - SP';
            break;
          case 'Alta Vista':
            condoInfo.address = 'R. Vitória Randi, 135';
            condoInfo.neighborhood = 'Valinhos - SP';
            break;
          case 'Life Space':
            condoInfo.address = 'Avenida Visconde de Guarapuava, 3806';
            condoInfo.neighborhood = 'Curitiba - PR';
            break;
          default:
            condoInfo.address = 'Av. Carlos Diaulas Serpa';
            condoInfo.neighborhood = 'Campinas - SP';
            break;
        }
        // console.warn('tokens: ', tokens)
        condos.push({
          ...condoInfo,
          token: pos.token,
          name,
          machineCompanyCode: pos.machineCompanyCode,
          id: pos.id,
          distance: "15m",
        });
        // const newUserInfo = { ...userInfo, ...(JSON.parse(storedInfo)), condos };
        const newUserInfo = { ...userInfo, condos };
        setUserInfo(newUserInfo);
        return newUserInfo;
      })
  })
  )}, []);

  useEffect(() => {
    if (userInfo.condo && userInfo.condo.token)
    all({ pointOfSaleId: userInfo.condo.id, token: userInfo.condo.token })
    //bug login aqui
    .then(response => {
      let categories = [];
      response.map(({ categoryId, categoryName }) => {
        if (!categoryName) {
          if (!categories.includes(`Categoria ${categoryId}`)) categories.push(`Categoria ${categoryId}`)
        } else {
          if (!categories.includes(categoryName)) categories.push(categoryName)
        }
      })
      const newUserInfo = { ...userInfo, availableProducts: response, categories };
      setUserInfo(newUserInfo);
    })
  }, [userInfo.condo]);

  return (
    <NavigationContainer>
        <UserContext.Provider value={[userInfo, setUserInfo]}>
          <CartContext.Provider value={[cartInfo, setCartInfo]}>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={Screens.LoginScreen} options= {{ headerShown: false }} />
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
        </UserContext.Provider>
    </NavigationContainer>

    // <NavigationContainer>
    //   <UserContext.Provider value={[userInfo, setUserInfo]}>
    //     <Stack.Navigator initialRouteName={"Suggestion"}>
    //       <Stack.Screen name="Suggestion" component={SuggestionScreen} options={{ headerShown: false }}/>
    //     </Stack.Navigator>
    //   </UserContext.Provider>
    // </NavigationContainer>
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