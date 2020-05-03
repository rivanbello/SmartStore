import React from 'react';
import { Row, Column } from '../layout';
import { Text } from 'react-native';
import { COLORS } from '../../constants';
import { Entypo } from '@expo/vector-icons';

const CondoCard = ({ name, address, neighborhood, distance, style }) => (
  <Column style={{ ...styles.container, ...style }}>
    <Row style={styles.label}>
      <Text style={styles.name}>{name}</Text>
      <Entypo
        name="location-pin"
        color={COLORS.primary}
        size={14}
      >
        <Text style={styles.distance}>{distance}</Text>
      </Entypo>
    </Row>
    <Text style={styles.description}>{address}</Text>
    <Text style={styles.description}>{neighborhood}</Text>
  </Column>
);

const styles = {
  container: {
    // backgroundColor: COLORS.lightLicac,
    backgroundColor: COLORS.lightLilac,
    borderRadius: 7,
    // height: 40,
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
  },
  name: {
    color: COLORS.darkLilac,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    justifyContent: 'space-between',
  },
  description: {
    alignSelf: 'flex-start',
    color: COLORS.lilac,
    fontSize: 12,
  },
  distance: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    fontSize: 12,
    alignSelf: 'flex-start',
  }
}

export default CondoCard;