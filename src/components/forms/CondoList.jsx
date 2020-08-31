import React from 'react';
import { FlatList, View } from 'react-native';
import CondoCard from './CondoCard';

const CondoList = ({ data, onPress, selectedItem }) => {
  return (
  <FlatList style={styles.container}
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
  />
  )
};

const styles = {
  container: {
    height: '70%',
  },
  item: {
    marginBottom: 10,
  },
  contentContainer: {
    minHeight: 400,
    paddingBottom: 200,
  }
}

export default CondoList;