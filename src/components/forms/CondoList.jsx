import React from 'react';
import { FlatList } from 'react-native';
import CondoCard from './CondoCard';
import * as Random from 'expo-random';

const CondoList = ({ data, onPress, selectedItem }) => {
  return (<FlatList style={styles.container}
    data={data}
    contentContainerStyle={styles.contentContainer}
    keyExtractor={(item, index) => item.name}
    renderItem={({ item: {
      name,
      address,
      neighborhood,
      // id,
      machineCompanyCode,
      distance,
    } = {},
  }) => <CondoCard
  style={styles.item}
  // selected={selectedItem === id}
  selected={selectedItem === machineCompanyCode}
      key={`${name}${machineCompanyCode}`}
      name={name}
      address={address}
      neighborhood={neighborhood}
      distance={distance}
      onPress={() => onPress(machineCompanyCode)}
    />}
  />)
};

const styles = {
  container: {
    height: '40%',
  },
  item: {
    marginBottom: 10,
  },
  contentContainer: {
    height: 400,
  }
}

export default CondoList;