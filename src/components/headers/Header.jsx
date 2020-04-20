import React from 'react';
import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants';
import { Row } from '../layout';

const Header = ({ children }) => (
  <Row style={styles.container}>
    {children}
  </Row>
);

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    maxHeight: SCREEN_HEIGHT * 0.08,
    padding: 5,
  }
})

export default Header;