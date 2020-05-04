import React from 'react';
import Screen from './Screen';
import { Image, Text } from 'react-native';
import { PrimaryButton } from '../buttons';
import { COLORS } from '../../constants';

const ConfirmationScreen = ({
  image,
  Icon,
  title,
  description,
  buttonLabel,
  onPress,
}) => (
  <Screen style={styles.container}>
    {!Icon && 
    <Image source={image} />}
    {Icon && 
      <Icon.family
        style={styles.icon}
        name={Icon.name}
        size={Icon.size}
      />
    }
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <PrimaryButton
      label={buttonLabel}
      style={styles.button}
      onPress={() => onPress()}
    />
  </Screen>
)

const styles = {
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '4%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: '5%',
    color: COLORS.darkLilac,
  },
  icon: {
    color: COLORS.primary,
    marginBottom: '5%'
  },
  description: {
    fontSize: 18,
    color: COLORS.lilac,
    textAlign: 'center',
    marginBottom: '15%'
  },
  button: {
    width: '80%',
  }
}

export default ConfirmationScreen;