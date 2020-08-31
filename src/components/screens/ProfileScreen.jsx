import React, { useContext } from 'react';
import { ProfileBackground, ProfileBackground2 } from '../../assets/images';
import { Row } from '../layout';
import { Image, Text, View, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import UnsafeScreen from './UnsafeScreen';
import { Ionicons } from '@expo/vector-icons'; 
import { COLORS } from '../../constants';
import { UserContext, CartContext, AuthenticationContext } from '../../context';
import * as SecureStore from 'expo-secure-store';

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [isLogged, setIsLogged] = useContext(AuthenticationContext);
  const [cartInfo, setCartInfo] = useContext(CartContext);
  return (
    <>
      <UnsafeScreen>
        <View>
          <Image source={ProfileBackground} style={styles.backgroundImage} />
          <Image source={ProfileBackground2} style={styles.backgroundImage} />
        </View>
        <Text style={styles.title}>Perfil</Text>
        <ScrollView style={styles.container}>
          <ProfileItem firstLabel="Nome" value={userInfo && userInfo.nome} />
          <ProfileItem firstLabel="E-mail" value={userInfo && userInfo.email} />
          {/* <ProfileItem firstLabel="E-mail" value={userInfo && userInfo.email} /> */}
          <ProfileItem firstLabel="Telefone" value={userInfo && userInfo.telefone} />
          <ProfileItem firstLabel="Condomínio" value={userInfo && userInfo.condo && userInfo.condo.name} />
          <TouchableOpacity
            style={styles.feedback}
            onPress={() => navigation.navigate('Suggestion')}
          >
            <Text style={styles.feedbackText}>Envie seu feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setCartInfo({ items: [], totalItems: 0 });
            AsyncStorage.setItem('userInfo', JSON.stringify({ ...userInfo, logged: false, password: '', email: '' }))
            .then(() => 
              setUserInfo({ ...userInfo, logged: false, password: '', email: '', cart: { items: [] } }))
            .then(() => SecureStore.setItemAsync('qwe', '{}'))
            .then(() => setIsLogged(false));
          }}>
            <Text style={{ alignSelf: 'center', marginVertical: 40, fontWeight: 'bold', color: COLORS.darkGray }}>Sair da minha conta</Text>
          </TouchableOpacity>
        </ScrollView>
      </UnsafeScreen>
    </>
  )
}

const onChangeUserInfo = ({ indexName, newValue }) => {
  setUserInfo({ ...userInfo, indexName: newValue });
};

const ProfileItem = ({ firstLabel, value }) => (
  
  value ?
  <TouchableOpacity>
  <Row style={styles.profileRow}>
    <Text style={{ ...styles.profileItem, ...styles.profileItemFirstLabel }}>{firstLabel}</Text>
    <Text style={styles.profileItem}>{value || 'nome'}</Text>
    <Ionicons style={{ ...styles.profileItem, alignSelf: 'flex-end', left:65 }} name="ios-arrow-forward" size={22} color={COLORS.lilac} />
  </Row>
  </TouchableOpacity>
  : null
)

const styles = {
  backgroundImage: {
    position: 'absolute',
    width: '112%',
    maxHeight: 200,
    // zIndex: 1,
    left: -20,
    top: -25,
  },
  feedback: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.salmon,
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 30,
  },
  container: {
    marginTop: 200,
  },
  profileItemFirstLabel: {
    fontWeight: 'bold',
    color: COLORS.lilac,
  },
  profileItem: {
    flex: 1,
    // height: 32,
    // lineHeight: 32,
    marginBottom: 10,
    marginTop: 10,
  },
  profileRow: {
    borderBottomWidth: 1,
    borderColor: COLORS.lilac,
  },
  feedbackText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 26,
    lineHeight: 32,
    zIndex: 3,
  },
}

export default ProfileScreen;