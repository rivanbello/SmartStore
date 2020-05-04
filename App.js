require('./src/firebase');
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ConfirmationScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
} from './src/components/screens';
import { UserContext } from './src/context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function App() {
  const [userInfo, setUserInfo] = useState({});
  const [logged, setLogged] = useState(false);

  return (
    <NavigationContainer>
      <UserContext.Provider value={[userInfo, setUserInfo]}>
        <Stack.Navigator initialRouteName={"ConfirmRegistration"}>
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
          <Stack.Screen
            name="ConfirmRegistration"
              title='hihi'
            options={{
              headerShown: false,
              buttonLabel: 'oi'
            }}
          >
            {props => <ConfirmationScreen {...props} {...confirmationScreenProps} />}
          </Stack.Screen>
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
    

    // <NavigationContainer>
    //   <UserContext.Provider value={[userInfo, setUserInfo]}>
    //     <Stack.Navigator initialRouteName={logged ? "Login" : "Main"}>
    //       <Stack.Screen name="Login" component={LoginScreen} />
    //       <Stack.Screen name="Main" component={HomeScreen} />
    //     </Stack.Navigator>
    //   </UserContext.Provider>
    // </NavigationContainer>
  );
}

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