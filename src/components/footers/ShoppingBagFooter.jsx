import React from 'react';
import { Text } from 'react-native';
import { Column, Row } from '../layout';
import { Link } from '../buttons';
import { PrimaryButton } from '../buttons';
import { COLORS, SCREEN_HEIGHT } from '../../constants';

const ShoppingBagFooter = ({ style, step = 0, totalSteps = 0, onPress = (() => {}), price = '10.00' }) => (
  <Column style={{ ...styles.container, ...style }}>
    <Row style={{ justifyContent: 'flex-end' }}>
        <Text style={styles.text}>Subtotal:</Text>
        <Text style={styles.price}>R$ {price}</Text>
    </Row>
    <Row>
        <Link label="Continuar comprando" />
    </Row>
    <Row>
        <PrimaryButton
            label="Realizar o pagamento"
            onPress={onPress}
        />
    </Row>
  </Column>
);

const styles = {
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: 14 * (SCREEN_HEIGHT / 600),
      maxHeight: 70,
      paddingTop: '2%',
    },
    price: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    stepBox: {
      width: '18%',
      top: 0,
      height: 44,
      backgroundColor: COLORS.lightLilac,
      justifyContent: 'center',
    },
    text: {
      color: COLORS.textPrimary,
      fontSize: 14,
      textAlign: 'center',
      marginRight: 15,
    },
  }
  
  export default ShoppingBagFooter;