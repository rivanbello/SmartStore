import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import List from '../list/List';
import FreeList from '../list/FreeList';
import Filter from '../filter/Filter';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { HomeHeader } from '../headers';
import Screen from './Screen';
import { UserContext } from '../../context';

const HomeScreen = ({ route: { params = {} } = {}, navigation }) => {
  const [userInfo] = useContext(UserContext);
  const [searchActive, setSearchActive] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  return (<>
  <HomeHeader
    name={userInfo.nome}
    condoName={userInfo.condo && userInfo.condo.name}
    searchActive={filterValue}
    onBack={() => setFilterValue('') }
    navigation={navigation}
  />
    <Screen>
      <Filter
        style={styles.filter}
        placeholder="O que você está procurando?"
        focused={filterValue}
        value={filterValue}
        onChangeText={(value) => setFilterValue(value)}
        onFocus={() => {}}
        onBlur={() => !filterValue}
        placeholderTextColor={COLORS.darkestGray}
        Icon={<Ionicons name="ios-search" size={26} style={{ color: COLORS.primary }}/>}
      />
      {Array.isArray(userInfo.availableProducts) &&
      (filterValue
        ? <FreeList list={
            userInfo.availableProducts
              .filter(({ description }) => {
                if (filterValue && description) return description
                  .toUpperCase()
                  .includes(filterValue.toUpperCase())
                  //placing all products with 0 quantity to the end
                  else return false;
                }).sort((a = {}, b = {}) => a.quantity === 0)
            }
          navigation={navigation}
          />
        : <List
        navigation={navigation}
        filterValue={filterValue}
        list={
          //displaying all products in random order
          userInfo.availableProducts.sort(() => Math.random() > 0.5)  
          //placing all products with 0 quantity to the end
          .sort((a = {}, b = {}) => a.quantity === 0)
        }
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