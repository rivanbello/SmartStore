import React from 'react';
import { View, Text } from 'react-native';
import { Row } from '../layout';
import { PrimaryButton } from '../buttons';
import { COLORS } from '../../constants';

const RegisterFooter = ({ step = 0, totalSteps = 0, buttonOnPress = (() => {}) }) => (
  <Row style={styles.container}>
    <View style={styles.stepBox}>
      <Text style={styles.stepBoxContent}>
        {step}/{totalSteps}
      </Text>
    </View>
    <PrimaryButton
      style={styles.button}
      label="Próxima"
      onPress={buttonOnPress}
    />
  </Row>
);

const styles = {
  container: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    marginBottom: '15%',
  },
  button: {
    width: '40%',
  },
  stepBox: {
    width: '18%',
    height: 44,
    backgroundColor: COLORS.salmon,
    justifyContent: 'center',
  },
  stepBoxContent: {
    color: COLORS.primary,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
}

export default RegisterFooter;