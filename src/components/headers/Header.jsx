import React from 'react';
import { StyleSheet } from 'react-native';
import { SCREEN_HEIGHT } from '../../constants';
import { Row } from '../layout';

const Header = ({ children, style }) => (
  <Row style={{ ...styles.container, ...style }}>
    {children}
  </Row>
);

const styles = StyleSheet.create({
  container: {
    maxHeight: SCREEN_HEIGHT * 0.08,
    marginTop: 10,
  }
})

export default Header;