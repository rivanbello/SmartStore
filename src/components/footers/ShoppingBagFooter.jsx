import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Column, Row } from '../layout';
import { Link } from '../buttons';
import { PrimaryButton } from '../buttons';
import { COLORS, SCREEN_HEIGHT } from '../../constants';

const ShoppingBagFooter = ({ style, step = 0, totalSteps = 0, onPress = (() => {}), total = '10.00', onPressLink, onPressResetCart }) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (<Column style={{ ...styles.container, ...style }}>
    <Row style={{ justifyContent: 'flex-end' }}>
        <Text style={styles.text}>Subtotal:</Text>
        <Text style={styles.price}>R$ {total.toFixed(2).replace('.',',')}</Text>
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
              // onPress={() => setModalOpen(!modalOpen)}
              disabled={total == 0}
            />
        </Row>
        <Link
          label="Esvaziar a sacola"
          style={styles.resetCartLink}
          labelStyle={styles.resetCartLinkLabel}
          onPress={() => onPressResetCart()}
        />
      </Column>
    </View>
    {modalOpen && <View style={styles.modal}>
      <Text style={styles.modalContent}>A operação de compra ainda não está disponível.</Text>
      <Link onPress={() => setModalOpen(!modalOpen)} label="Entendi" />
    </View>}
  </Column>);
};

const styles = {
    container: {
      justifyContent: 'space-between',
      paddingBottom: 14 * (SCREEN_HEIGHT / 600),
      paddingTop: '2%',
    },
    modal: {
      borderRadius: 8,
      width: '100%',
      position: 'absolute',
      top: '0%',
      padding: 20,
      hadowColor: "#000",
      backgroundColor: 'white',
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowBlur: 10,
      shadowOpacity: 0.30,
      shadowRadius: 1.41,
      elevation: 10,
    },
    modalContent: {
      textAlign: 'center',
      fontSize: 18,
      marginBottom: 8,
      color: COLORS.primary,
      fontWeight: 'bold',
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
      margin: 20,
    },
    resetCartLink: {
      marginTop: 20,
    },
    resetCartLinkLabel: {
      color: COLORS.primary,
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