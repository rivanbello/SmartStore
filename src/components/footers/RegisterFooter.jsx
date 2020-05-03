import React from 'react';
import { View, Text } from 'react-native';
import { Row } from '../layout';
import { PrimaryButton } from '../buttons';
import { COLORS } from '../../constants';

const RegisterFooter = ({ style, step = 0, totalSteps = 0, onPress = (() => {}) }) => (
  <Row style={{ ...styles.container, ...style }}>
    <View style={styles.stepBox}>
      <Text style={styles.stepBoxContent}>
        {step}/{totalSteps}
      </Text>
    </View>
    <PrimaryButton
      style={styles.button}
      label="Próxima"
      onPress={onPress}
    />
  </Row>
);

const styles = {
  container: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '12%',
    paddingTop: '2%',
  },
  button: {
    width: '40%',
  },
  stepBox: {
    width: '18%',
    top: 0,
    height: 44,
    backgroundColor: COLORS.lightLilac,
    justifyContent: 'center',
  },
  stepBoxContent: {
    color: COLORS.textPrimary,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
}

export default RegisterFooter;