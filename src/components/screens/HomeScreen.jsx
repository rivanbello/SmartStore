import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import List from '../list/List';
import FreeList from '../list/FreeList';
import Filter from '../filter/Filter';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { HomeHeader } from '../headers';
import Screen from './Screen';
import { UserContext } from '../../context';
import all from '../../client/list';

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
    navigation={navigation}
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
      {userInfo.availableProducts &&
      (searchActive
        ? <FreeList list={
            userInfo.availableProducts
              .filter(({ description }) => {
                if (filterValue) return description.toUpperCase().includes(filterValue.toUpperCase())
                else return true;
              })
            }
          navigation={navigation}
          />
        : <List
        navigation={navigation}
        filterValue={filterValue}
        list={userInfo.availableProducts}
        />)
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