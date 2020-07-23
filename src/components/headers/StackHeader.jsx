import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ShoppingBag from '../icons/ShoppingBag';
import { COLORS } from '../../constants';
import { CartContext } from '../../context';

const StackHeader = ({
  handleGoBack = (() => {}),
  getBackFromSearch,
  style,
  fontStyle,
  showShoppingBag = true,
  handleOnPress = (() => {}),
}) => {
  const navigation = useNavigation();
  const [cartInfo] = useContext(CartContext);
  return (
    <Header style={{ ...styles.container, ...style }}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => {
          if ((!navigation.dangerouslyGetState().index != '1' && handleGoBack) || getBackFromSearch)
            handleGoBack();
        }}
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
        quantity={cartInfo.totalItems}
        handleOnPress={() => handleOnPress()}
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