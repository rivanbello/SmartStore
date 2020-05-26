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
      <UnsafeScreen>
        <View>
          <Image source={ProfileBackground} style={styles.backgroundImage} />
          <Image source={ProfileBackground2} style={styles.backgroundImage} />
        </View>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.container}>
          <ProfileItem firstLabel="Nome" value={userInfo && userInfo.nome} />
          {/* <ProfileItem firstLabel="E-mail" value={userInfo && userInfo.email} /> */}
          <ProfileItem firstLabel="Telefone" value={userInfo && userInfo.telefone} />
          <ProfileItem firstLabel="Nome" value={userInfo && userInfo.condo && userInfo.condo.name} />
          <TouchableOpacity
            style={styles.feedback}
            onPress={() => navigation.navigate('Suggestion')}
          >
            <Text style={styles.feedbackText}>Envie seu feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setUserInfo({ ...userInfo, logged: false })
            navigation.navigate('Login');
          }}>
            <Text style={{ alignSelf: 'center', marginTop: 80, fontWeight: 'bold', color: COLORS.darkGray }}>Sair da minha conta</Text>
          </TouchableOpacity>
        </View>
      </UnsafeScreen>
    </>
  )
}

const onChangeUserInfo = ({ indexName, newValue }) => {
  setUserInfo({ ...userInfo, indexName: newValue });
}

const ProfileItem = ({ firstLabel, value }) => (
  
  value ? <Row style={styles.profileRow}>
    <Text style={{ ...styles.profileItem, ...styles.profileItemFirstLabel }}>{firstLabel}</Text>
    <Text style={styles.profileItem}>{value || 'nome'}</Text>
    <Ionicons style={{ ...styles.profileItem, alignSelf: 'flex-end', left:65 }} name="ios-arrow-forward" size={22} color={COLORS.lilac} />
  </Row>
  : null
)

const styles = {
  backgroundImage: {
    position: 'absolute',
    width: '112%',
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
    height: 32,
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