import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Row } from '../layout';
import Header from './Header';
import { COLORS } from '../../constants';

const LoginHeader = () => (
  <Header>
    <Row style={styles.content}>
      <Text style={styles.text}>Ainda não tem conta?</Text>
      <Text style={styles.link}> Cadastre-se</Text>
    </Row>
  </Header>
);

const styles = StyleSheet.create({
  content: {
    justifyContent: 'flex-end',
  },
  text: {
    color: COLORS.darkestGray,
  },
  link: {
    color: COLORS.primary,
  }
});

export default LoginHeader;