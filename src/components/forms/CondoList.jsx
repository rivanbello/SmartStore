import React from 'react';
import { FlatList } from 'react-native';
import CondoCard from './CondoCard';

const CondoList = () => (
  <FlatList style={styles.container}
    data={['oi', 'wi']}
    renderItem={() => <CondoCard
      style={styles.item}
      name="Condomínio Santa Cruz"
      address="R. Luiz Carlos Alvez, Mercês, 126523"
      neighborhood="Mercês - Curitiba"
      distance="15m"
    />}
  />
);

const styles = {
  item: {
    marginBottom: 10,
  }
}

export default CondoList;