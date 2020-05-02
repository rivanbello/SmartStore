import { Dimensions } from 'react-native';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);

const COLORS = {
  primary: '#FB394B',
  darkGray: '#A3A3A3',
  darkestGray: '#656565',
  gray: '#C4C4C4',
  lightGray: '#F8F8F8',
  salmon: "#FFF4F6",
  textPrimary: '#656379',
}

export {
  COLORS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
}
