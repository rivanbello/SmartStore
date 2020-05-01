require('./src/firebase');
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
} from './src/components/screens';
import { UserContext } from './src/context';

export default function App() {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={[userInfo, setUserInfo]}>
      <SafeAreaView style={styles.container}>
        {/* <LoginScreen /> */}
        {/* <HomeScreen /> */}
        <RegisterScreen />
      </SafeAreaView>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
  },
});