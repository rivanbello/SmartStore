import React from 'react';
import { Text, View } from 'react-native';
import { Column, Row } from '../layout';
import { Link } from '../buttons';
import { PrimaryButton } from '../buttons';
import { COLORS, SCREEN_HEIGHT } from '../../constants';

const ShoppingBagFooter = ({ style, step = 0, totalSteps = 0, onPress = (() => {}), total = '10.00', onPressLink }) => (
  <Column style={{ ...styles.container, ...style }}>
    <Row style={{ justifyContent: 'flex-end' }}>
        <Text style={styles.text}>Subtotal:</Text>
        <Text style={styles.price}>R$ {total.toFixed(2)}</Text>
    </Row>
    <View style={{ alignItems: 'flex-end' }}>
      <Column>
        <Link
          label="Continuar comprando"
          style={styles.link}
          labelStyle={styles.linkLabel}
          onPress={() => onPressLink()}  
        />
        <Row>
            <PrimaryButton
              label="Realizar o pagamento"
              onPress={onPress}
              disabled={total == 0}
            />
        </Row>
      </Column>
    </View>
  </Column>
);

const styles = {
    container: {
      justifyContent: 'space-between',
      paddingBottom: 14 * (SCREEN_HEIGHT / 600),
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
    link: {
      marginBottom: 20,
    },
    linkLabel: {
      fontSize: 18,
    },
    text: {
      color: COLORS.textPrimary,
      fontSize: 14,
      textAlign: 'center',
      marginRight: 15,
    },
  }
  
  export default ShoppingBagFooter;