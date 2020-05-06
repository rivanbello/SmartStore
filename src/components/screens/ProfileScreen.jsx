import React, { useState, useContext } from 'react';
import { ProfileBackground, ProfileBackground2 } from '../../assets/images';
import { Row } from '../layout';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import UnsafeScreen from './UnsafeScreen';
import { Ionicons } from '@expo/vector-icons'; 
import { COLORS } from '../../constants';
import { UserContext } from '../../context';

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  return (
    <>
      {console.warn(userInfo)}
      <UnsafeScreen>
        <View>
          <Image source={ProfileBackground} style={styles.backgroundImage} />
          <Image source={ProfileBackground2} style={styles.backgroundImage} />
        </View>
        <Text style={styles.title}>Perfil</Text>
        <View>
          <ProfileItem firstLabel="Nome" value={userInfo && userInfo.nome} />
          <ProfileItem firstLabel="E-mail" value={userInfo && userInfo.email} />
          <ProfileItem firstLabel="Telefone" value={userInfo && userInfo.telefone} />
          <ProfileItem firstLabel="Nome" value={userInfo && userInfo.condo && userInfo.condo.name} />
          <TouchableOpacity onPress={() => {
            setUserInfo({ ...userInfo, logged: false })
            navigation.navigate('Login');
          }}>
            <Text>Sair da minha conta</Text>
          </TouchableOpacity>
        </View>
      </UnsafeScreen>
    </>
  )
}

const ProfileItem = ({ firstLabel, value }) => (
  <Row style={styles.profileRow}>
    <Text style={{ ...styles.profileItem, ...styles.profileItemFirstLabel }}>{firstLabel}</Text>
    <Text style={styles.profileItem}>{value || 'nome'}</Text>
    <Ionicons style={{ ...styles.profileItem, alignSelf: 'flex-end' }} name="ios-arrow-forward" size={14} color={COLORS.lilac} />
  </Row>
)

const styles = {
  backgroundImage: {
    position: 'absolute',
    width: '112%',
    // zIndex: 1,
    left: -20,
    top: -25,
  },
  profileItemFirstLabel: {
    fontWeight: 'bold',
    color: COLORS.lilac,
  },
  profileItem: {
    flex: 1,
    height: 25,
    marginTop: 5,
  },
  profileRow: {
    borderBottomWidth: 1,
    borderColor: COLORS.lilac,
  },
  title: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    zIndex: 3,
  },
}

export default ProfileScreen;