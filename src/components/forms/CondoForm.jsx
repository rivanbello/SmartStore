import React from 'react';
import CondoList from './CondoList';
import CondoCard from './CondoCard';
import { View, Text, TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants';
import { Ionicons } from '@expo/vector-icons';

const CondoForm = ({ data }) => {
  return (data &&
    <View>
      <Text style={styles.sectionLabel}>Sugestão</Text>
      <CondoCard 
        name={data[0].name}
        address={data[0].address}
        neighborhood={data[0].neighborhood}
        distance={data[0].distance}
      />
      <TouchableOpacity
        style={styles.searchField}
      >
        <Ionicons name="ios-search"
          size={24}
          style={styles.searchIcon}
        />
        <Text style={styles.searchPlaceholder}>Encontre</Text>
      </TouchableOpacity>
      <Text style={styles.sectionLabel}>Outros</Text>
      <CondoList data={data.slice(1)}/>
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
    width: '30%',
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
  }
}

export default CondoForm;