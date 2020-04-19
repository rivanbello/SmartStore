import React from 'react';
import { Row, StyleSheet } from '../layout';
import { COLORS } from '../../constants';

const LoginHeader = () => (
  <Row style={styles.container}>
    <Text style={styles.text}>Ainda não tem conta?</Text>
    <Text style={styles.link}>Cadastre-se</Text>
  </Row>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  text: {
    color: COLORS.grey,
  },
  link: {
    color: COLORS.primary,
  }
});

export default LoginHeader;