import React, { useContext } from 'react';
import Header from './Header';
import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ShoppingBag from '../icons/ShoppingBag';
import { COLORS } from '../../constants';
import { UserContext } from '../../context';

const StackHeader = ({ handleGoBack = (() => {}), style, fontStyle, showShoppingBag = true }) => {

  const [userInfo] = useContext(UserContext);
  return (
    <Header style={{ ...styles.container, ...style }}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={handleGoBack}
      >
        <Feather
          name="arrow-left"
          size={26}
          style={{
            left: -2,
            color: COLORS.textPrimary,
            ...fontStyle,
          }}
        />
        <Text style={{ color: COLORS.textPrimary, ...fontStyle }}>Voltar</Text>
      </TouchableOpacity>
      {showShoppingBag && <ShoppingBag
        header
        quantity={userInfo.cart.items.length}
        handleOnPress={() => navigation.navigate('ShoppingBag')}
      />}
    </Header>
  );
};

const styles = {
  container: {
    justifyContent: 'space-between',
  },
  wrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  }
}

export default StackHeader;