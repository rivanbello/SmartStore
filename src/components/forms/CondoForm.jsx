import React, { useState, useEffect } from 'react';
import CondoList from './CondoList';
import CondoCard from './CondoCard';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TextInput
} from 'react-native'
import { COLORS } from '../../constants';
import { Ionicons } from '@expo/vector-icons';

const CondoForm = ({ data, setHideHeader, setFormValue }) => {
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [searchWidth] = useState(new Animated.Value(34))
  const [selected, setSelected] = useState(-1);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    setFormValue(data.filter(({ id }) => selected === id)[0])
  }, [selected])
  useEffect(() => {
    searchIsActive && Animated.timing(searchWidth, {
      toValue: 100,
      duration: 300,
    }).start();
    !searchIsActive && Animated.timing(searchWidth, {
      toValue: 34,
      duration: 300,
    }).start();
  }, [searchIsActive]);
  return (data &&
    <View style={{ top: searchIsActive ? 0 : 20 }}>
      {/* {!searchIsActive &&
      <View>
        <Text style={styles.sectionLabel}>Sugestão</Text>
        <CondoCard
          selected={selected === 0}
          name={data[0].name}
          address={data[0].address}
          neighborhood={data[0].neighborhood}
          distance={data[0].distance}
          onPress={() => setSelected(0)}
        />
        </View>
      } */}
      <TouchableOpacity
        onPress={() => {
          setSearchIsActive(!searchIsActive)
          setHideHeader(true);
        }}
      >
        <Animated.View
          style={{
            ...styles.searchField,
            width: searchWidth.interpolate({
              inputRange: [34, 100],
              outputRange: ['40%', '100%'],
            }),
          }}
        >
          <Ionicons name="ios-search"
            size={24}
            style={styles.searchIcon}
          />
          {!searchIsActive && <Text style={styles.searchPlaceholder}>Encontre</Text>}
          {searchIsActive && 
          <TextInput
            autoFocus
            onBlur={() => {
              !filter && setSearchIsActive(false);
              !filter && setHideHeader(false);
              setFilter('');
            }}
            onFocus={() => setHideHeader(true)}
            style={{
              width: '80%',
              marginLeft: 30,
            }}
            onChangeText={(text) => setFilter(text)}
          />}
        </Animated.View>
      </TouchableOpacity>
      <Text style={styles.sectionLabel}>Outros</Text>
      <CondoList
        data={data.filter(({ name }) => name.toUpperCase().includes(filter.toUpperCase()))}
        onPress={(id) => setSelected(id)}
        selectedItem={selected}
      />
    </View>
  || <Text>
    Erro ao buscar os condomínios, tente novamente mais tarde.
  </Text>)
}

const styles = {
  sectionLabel: {
    fontSize: 10,
    color: COLORS.lilac,
    marginBottom: 10,
  },
  searchField: {
    backgroundColor: COLORS.salmon,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // width: '34%',
    borderRadius: 20,
    marginTop: 26,
    marginBottom: 22,
  },
  searchPlaceholder: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: 8,
    color: COLORS.primary,
  },
  searchIcon: {
    color: COLORS.primary,
    position: 'absolute',
    left: 15
  }
}

export default CondoForm;