import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ShoppingBag from '../icons/ShoppingBag';
import { COLORS } from '../../constants';
import { UserContext } from '../../context';

const StackHeader = ({
  handleGoBack = (() => {}),
  style,
  fontStyle,
  showShoppingBag = true,
  handleOnPress = (() => {}),
}) => {
  const navigation = useNavigation();
  const [userInfo] = useContext(UserContext);
  // const countTotalItems = () => {
  //   let count = 0;
  //   userInfo.cart.items.forEach(({qty}) => count += qty);
  //   return count;
  // };
  // const [totalItems, setTotalItems] = useState(countTotalItems());
  // useEffect(() => {
  //   let count = 0;
  //   userInfo.cart.items.forEach(({qty}) => count += qty);
  //   setTotalItems(count);
  // }, [userInfo.cart.items.length])
  return (
    <Header style={{ ...styles.container, ...style }}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => {
          if (!navigation.dangerouslyGetState().index != '1' && handleGoBack)
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
        quantity={userInfo.cart.totalItems}
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