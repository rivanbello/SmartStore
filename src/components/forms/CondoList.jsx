import React from 'react';
import { FlatList } from 'react-native';
import CondoCard from './CondoCard';

const CondoList = ({ data, onPress }) => (
  <FlatList style={styles.container}
    data={data}
    renderItem={({ item: { name,
      address,
      neighborhood,
      distance } = {},
      index
    }) => <CondoCard
      style={styles.item}
      name={name}
      address={address}
      neighborhood={neighborhood}
      distance={distance}
      onPress={() => onPress(index)}
    />}
  />
);

const styles = {
  item: {
    marginBottom: 10,
  }
}

export default CondoList;