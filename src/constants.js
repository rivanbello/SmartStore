import { Dimensions } from 'react-native';
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);

const COLORS = {
  primary: '#E64463',
  darkGray: '#656565',
  gray: '#D9D7D7',
  lightGray: '#F8F8F8',
}

export {
  COLORS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
}
