import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Row } from '../layout';
import { COLORS } from '../../constants';

const TopAlert = ({ firstLabel, secondLabel, style, error, onPress }) => (
  <TouchableOpacity
    onPress={() => onPress()}
    style={{
    ...styles.container,
    ...style,
    backgroundColor: error ? COLORS.primary : '#fff',
  }}>
    <Row style={styles.content}>
      <Text style={styles.text}>{firstLabel}</Text>
        <Text
          style={{ ...styles.link, color: error ? 'white' : COLORS.primary }}>
          {secondLabel}
        </Text>
    </Row>
  </ TouchableOpacity>
);

const styles = {
  container: {
    position: 'absolute',
    top: 30,
    minHeight: 44,
    alignSelf: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 22,
    shadowColor: "#000",
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowBlur: 10,
    shadowOpacity: 0.30,
    shadowRadius: 1.41,
    elevation: 10,
  },
  text: {
    color: COLORS.darkestGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  link: {
    color: COLORS.primary,
    fontWeight: 'bold',
  }
};

export default TopAlert;