import React, { useEffect } from 'react';
import { Row } from '../layout';
import { Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import { Entypo } from '@expo/vector-icons';

const CondoCard = ({
  name,
  address,
  neighborhood,
  distance,
  style,
  selected,
  onPress
}) => {
  return (
    <TouchableOpacity style={{
      ...styles.container,
      ...style,
      backgroundColor: selected ? COLORS.primary : styles.container.backgroundColor
      }}
      onPress={() => onPress()}
    >
    <Row style={styles.label}>
      <Text style={{
        ...styles.name,
        color: selected ? 'white' : styles.name.color
      }}>{name}</Text>
      {/* <Entypo
        name="location-pin"
        color={selected ? 'white' : COLORS.primary}
        size={14}
      >
        <Text style={{
          ...styles.distance,
          color: selected ? 'white' : styles.distance.color
        }}>
          {distance}
        </Text>
      </Entypo> */}
    </Row>
    <Text style={{
      ...styles.description,
      color: selected ? 'white' : styles.description.color,
    }}>{address}</Text>
    <Text style={{
      ...styles.description,
      color: selected ? 'white' : styles.description.color,
    }}>{neighborhood}</Text>
  </TouchableOpacity>)
};

let styles = {
  container: {
    backgroundColor: COLORS.lightLilac,
    borderRadius: 7,
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