import React from 'react';
import { Text, View } from 'react-native';
import { Column, Row } from '../layout';
import { PrimaryButton } from '../buttons';
import { COLORS, SCREEN_HEIGHT } from '../../constants';
import { PaymentMethodCard } from '../misc';

const CheckoutFooter = ({ style, onPress, total, onPressLink, setDrawerIsOpened, removeCard, card, loading }) => {

  return (<Column style={{ ...styles.container, ...style }}>
    <PaymentMethodCard
      setDrawerIsOpened={setDrawerIsOpened}
      onPress={onPress}
      card={card}
      removeCard={() => removeCard()}
    />
    <View>
        <Column>
        <Row style={{ marginBottom: 20 }}>
            <Text style={styles.text}>Total: </Text>
            <Text style={styles.price}>R$ {total.toFixed(2).replace('.',',')}</Text>
        </Row>
        <Row>
          <PrimaryButton
            loading={loading}
            label="Pagar"
            onPress={onPress}
            disabled={!card || !card.name}
          />
        </Row>
      </Column>
    </View>
  </Column>)
};

const styles = {
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: 14 * (SCREEN_HEIGHT / 600),
      paddingTop: '2%',
      minHeight: 200,
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