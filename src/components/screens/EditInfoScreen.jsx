import React from 'react';
import Screen from './Screen';
import {Row} from '../layout'
import {StyleSheet, TouchableOpacity, TouchableHighlight, Text } from 'react-native'
import { StackHeader } from '../headers';
import { TextInput } from 'react-native-gesture-handler';

const EditInfoScreen = ({ title, navigation, route }) => (
  <Screen>
    <Row>
    <StackHeader
      handleGoBack={() => navigation.goBack()}
      showShoppingBag={false}
    />
      <Text style={styles.Title}>{route.params.title}</Text>
    </Row>
    <TextInput></TextInput>
  </Screen>
) 
const styles = StyleSheet.create({
  Title: {
    top: 9,
    position: 'absolute',
    alignItems: 'center',
    fontSize: 20,
  
  }
})

export default EditInfoScreen