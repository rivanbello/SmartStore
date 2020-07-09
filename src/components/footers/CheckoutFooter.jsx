import React from 'react';
import { Text, View } from 'react-native';
import { Column, Row } from '../layout';
import { PrimaryButton } from '../buttons';
import { COLORS, SCREEN_HEIGHT } from '../../constants';
import { PaymentMethodCard } from '../misc';

const CheckoutFooter = ({ style, step = 0, totalSteps = 0, onPress = (() => {}), price = '10.00', onPressLink, setDrawerIsOpened }) => (
  <Column style={{ ...styles.container, ...style }}>
    <PaymentMethodCard setDrawerIsOpened={setDrawerIsOpened} />
    <View>
        <Column>
        <Row style={{ marginBottom: 20 }}>
            <Text style={styles.text}>Total: </Text>
            <Text style={styles.price}>R$ {price}</Text>
        </Row>
        <Row>
            <PrimaryButton
              label="Pagar"
              onPress={onPress}
            />
        </Row>
      </Column>
    </View>
  </Column>
);

const styles = {
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: 14 * (SCREEN_HEIGHT / 600),
      paddingTop: '2%',
    },
    price: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 24,
    },
    stepBox: {
      width: '18%',
      top: 0,
      height: 44,
      backgroundColor: COLORS.lightLilac,
      justifyContent: 'center',
    },
    total: {
        marginBottom: 20,
        fontSize: 18,
    },
    linkLabel: {
      fontSize: 18,
    },
    text: {
      color: COLORS.textPrimary,
      fontSize: 24,
      fontWeight: 'bold',
    },
  }
  
  export default CheckoutFooter;