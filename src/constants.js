import { Dimensions } from 'react-native';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);

const COLORS = {
  primary: '#E64463',
  darkGray: '#A3A3A3',
  darkestGray: '#656565',
  gray: '#C4C4C4',
  lightGray: '#F8F8F8',
}

export {
  COLORS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
}
