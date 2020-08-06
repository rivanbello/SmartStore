import { Animated } from 'react-native';

const floatingLabel = (args = []) => (
  args.map(({ position, toValue, duration }) => (
    Animated.timing(position, {
      toValue,
      duration,
      useNativeDriver: false,
    }).start()
  ))
);

export {
  floatingLabel,
}