import React, { useState } from 'react';
import Screen from './Screen';
import { Text, TextInput, View } from 'react-native';
import { Row } from '../layout';
import { StackHeader } from '../headers';
import { PrimaryButton } from '../buttons';
import { COLORS } from '../../constants';
const SuggestionScreen = () => {
  const [value, setValue] = useState('');
  return (
    <Screen>
      <StackHeader/>
        <View style={{ justifyContent: 'space-between', flex: 1 }}>
        <View>
          <TextInput
          onChangeText={(value) => setValue(value)}
          style={{ marginTop: 50 }} 
          placeholder="Sua sugestão" maxLength={50}/>
          {/* <Text style={styles.pageTitle}>Sugestão</Text> */}
          <View style={styles.separationLine} />
          <Text style={{ color: COLORS.lilac, marginTop: 15, }}>Sua opinião é muito importante pra que nosso aplicativo evolua de acordo com suas necessidade</Text>
          {!value && <Text style={{ color: 'red', marginTop: 15, textAlign: 'center' }}>Insira uma sugestão antes de continuar</Text>}
        </View>
        <PrimaryButton
          style={{ marginBottom: 30 }}
          label={'Enviar sugestão'}
        />
      </View>
    </Screen>
  )
}

const styles = {
  pageTitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  separationLine: {
    borderTopWidth: 1,
    borderColor: COLORS.lilac,
    width: 1200,
    left: -200,
  },
}
export default SuggestionScreen;