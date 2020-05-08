import React from 'react';
import { FlatList } from 'react-native';
import CondoCard from './CondoCard';

const CondoList = ({ data, onPress, selectedItem }) => (
  <FlatList style={styles.container}
    data={data}
    contentContainerStyle={styles.contentContainer}
    renderItem={({ item: { name,
      address,
      neighborhood,
      distance } = {},
      index
    }) => <CondoCard
      style={styles.item}
      selected={selectedItem === index + 1}
      name={name}
      address={address}
      neighborhood={neighborhood}
      distance={distance}
      onPress={() => onPress(index)}
    />}
  />
);

const styles = {
  container: {
    height: '65%',
  },
  item: {
    marginBottom: 10,
  },
  contentContainer: {
    height: 400,
  }
}

export default CondoList;