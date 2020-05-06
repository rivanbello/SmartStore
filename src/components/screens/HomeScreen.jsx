import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import List from '../list/List';
import FreeList from '../list/FreeList';
import Filter from '../filter/Filter';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { HomeHeader } from '../headers';
import Screen from './Screen';
import { UserContext } from '../../context';

const HomeScreen = ({ route: { params = {} } = {}, navigation }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [searchActive, setSearchActive] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  return (<>
  <HomeHeader
    name={userInfo.nome}
    condoName={userInfo.condo && userInfo.condo.name}
    searchActive={searchActive}
    setSearchActive={() => setSearchActive(false)}
  />
    <Screen>
      <Filter
        style={styles.filter}
        placeholder="O que você está procurando?"
        focused={searchActive}
        onChangeText={(value) => setFilterValue(value)}
        onFocus={() => setSearchActive(true)}
        onBlur={() => !filterValue && setSearchActive(false)}
        placeholderTextColor={COLORS.darkestGray}
        Icon={<Ionicons name="ios-search" size={26} style={{ color: COLORS.primary }}/>}
      />
      {searchActive
        ? <FreeList list={
            userInfo &&
            userInfo.availableProducts
              .filter(({ description }) => {
                if (filterValue) return description.toUpperCase().includes(filterValue.toUpperCase())
                else return true;
              })
          }/>
        : <List navigation={navigation} filterValue={filterValue} />
      }
    </Screen>
  </>)
};

const styles = StyleSheet.create({
  filter:{
    marginBottom: 20,
    width: '100%',
    fontSize: 14,
    shadowColor: "#000",
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    // shadowBlur: 10,
    shadowOpacity: 0.30,
    shadowRadius: 1.41,
    elevation: 10,
    color: COLORS.darkestGray,
    position: 'absolute',
    top: -25,
    left: 18,
  },
});

export default HomeScreen;