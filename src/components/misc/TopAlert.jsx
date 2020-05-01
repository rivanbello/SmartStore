import React from 'react';
import { View, Text } from 'react-native';
import { Row } from '../layout';
import { COLORS } from '../../constants';

const TopAlert = ({ firstLabel, secondLabel, style }) => (
  <View style={{ ...styles.container, ...style }}>
    <Row style={styles.content}>
      <Text style={styles.text}>{firstLabel}</Text>
      <Text style={styles.link}>{secondLabel}</Text>
    </Row>
  </View>
);

const styles = {
  container: {
    position: 'absolute',
    top: 30,
    height: 44,
    alignSelf: 'center',
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