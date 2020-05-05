require('./src/firebase');
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import all from './src/client/list';
import {
  ConfirmationScreen,
  RegisterScreen,
  InformationScreen,
  FeedbackConfirmationScreen,
  SuggestionScreen,
  LoginScreen,
  HomeScreen,
  ProductScreen,
  CategoryScreen,
} from './src/components/screens';
import { UserContext } from './src/context';
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
  const [userInfo, setUserInfo] = useState({});
  const [logged, setLogged] = useState(true);
  useEffect(() => {
    all({ pointOfSaleId: 1 }).then(response => {
      let categories = [];
      response.map(({ categoryId, categoryName }) => {
        if (!categoryName) {
          if (!categories.includes(`Categoria ${categoryId}`)) categories.push(`Categoria ${categoryId}`)
        } else {
          if (!categories.includes(categoryName)) categories.push(categoryName)
        }
      })
      setUserInfo({ ...userInfo, availableProducts: response, categories });
    })
  }, []);
  
  return (
    // <NavigationContainer>
    //   <UserContext.Provider value={[userInfo, setUserInfo]}>
    //   <Stack.Navigator initialRouteName={logged ? "Login" : "Main"}>
    //       <Stack.Screen name="Login" component={LoginScreen} />
    //       <Stack.Screen name="Main" component={HomeScreen} />
    //     </Stack.Navigator>
    //     <Stack.Navigator initialRouteName={"ConfirmRegistration"}>
    //       <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
    //       <Stack.Screen
    //         name="ConfirmRegistration"
    //           title='hihi'
    //         options={{
    //           headerShown: false,
    //           buttonLabel: 'oi'
    //         }}
    //       >
    //         {props => <ConfirmationScreen {...props} {...confirmationScreenProps} />}
    //       </Stack.Screen>
    //     </Stack.Navigator>
    //   </UserContext.Provider>
    // </NavigationContainer>
    
    <NavigationContainer>
      <UserContext.Provider value={[userInfo, setUserInfo]}>
      <Stack.Navigator>
        <Stack.Screen name="Navigator" component={AppNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Product" component={ProductScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Suggestion" component={SuggestionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FeedbackConfirmation" component={FeedbackConfirmationScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>

    // <NavigationContainer>
    //   <UserContext.Provider value={[userInfo, setUserInfo]}>
    //     <Stack.Navigator initialRouteName={"Suggestion"}>
    //       <Stack.Screen name="Info" component={InformationScreen} options={{ headerShown: false }}/>
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
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Info" component={InformationScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Perfil" component={LoginScreen} options={{ headerShown: false }}/>
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