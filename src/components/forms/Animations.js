import { Animated } from 'react-native';

const floatingLabel = (args = []) => (
  args.map(({ position, toValue, duration }) => (
    Animated.timing(position, {
      toValue,
      duration,
    }).start()
  ))
);

export {
  floatingLabel,
}