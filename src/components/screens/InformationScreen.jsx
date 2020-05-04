import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import { Row } from '../layout';
import Screen from './Screen';

const InformationScreen = () => (
  <Screen>
    <Text style={styles.pageTitle}>Informações</Text>
    <Text style={styles.title}>
      Como comprar?
    </Text>
    <Text style={styles.content}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat,
      eros quis sollicitudin tincidunt, ipsum quam tincidunt tortor, id euismod augue purus vel libero. Aliquam sollicitudin velit massa, eu laoreet lacus tempor imperdiet.
    </Text>
    <Text style={styles.title}>
      Como comprar?
    </Text>
    <Text style={styles.content}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat,
      eros quis sollicitudin tincidunt, ipsum quam tincidunt tortor, id euismod augue purus vel libero. Aliquam sollicitudin velit massa, eu laoreet lacus tempor imperdiet.
    </Text>
    <Text style={styles.title}>
      F.A.Q.
    </Text>
    <FAQItem />
  </Screen>
);

const FAQItem = () => {
  const [active, setActive] = useState(false);
  return (<TouchableOpacity onPress={() => setActive(!active)}>
    <View style={styles.separationLine} 
    />
      <Row style={{ justifyContent: 'space-between' }}>
        <Text style={styles.FAQTitle}>Posso comprar em qualquer Smartstore?</Text>
        {active ? <View
          transform={[{rotateZ: '45deg'}]}
        >
          <Text
            style={styles.expand}
          >+</Text>
        </View>
        : <View
      >
        <Text
          style={styles.expand}
        >+</Text>
      </View>}
          
      </Row>
      {active && <Text style={styles.content}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat, eros quis sollicitudin tincidunt, ipsum quam tincidunt tortor, id euismod augue purus vel libero.
      </Text>}
    <View style={styles.separationLine} />
  </TouchableOpacity>)
}

const styles = {
  pageTitle: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    fontSize: 26,
    marginTop: 22,
    marginBottom: 18,
  },
  content: {
    color: COLORS.lilac,
    marginBottom: 13,
  },
  separationLine: {
    borderTopWidth: 1,
    borderColor: COLORS.lilac,
    width: 1200,
    left: -200,
  },
  expand: {
    color: COLORS.primary,
    fontSize: 22,
  },
  FAQTitle: {
    fontWeight: 'bold',
    marginTop: 13,
    marginBottom: 10,
    color: COLORS.textPrimary,
  },
}

export default InformationScreen;