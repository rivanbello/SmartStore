import React from 'react';
import { Text } from 'react-native'
import { COLORS } from '../../constants';
const generateSteps = (context) => [
  {
    label: 
    <Text style={styles.stepLabel}>
      <Text>Vamos começar pelo seu nome</Text>
    </Text>,
    stepIndex: 1,
    formItems: [
      {
        placeholder: 'Nome',
        iconFamily: 'FontAwesome',
        iconName: 'user-circle',
      }
    ]
  },
  {
    label:
    <Text style={styles.stepLabel}>
      <Text>Legal </Text>
      <Text style={{ color: COLORS.primary }}>{context.nome}</Text>
      <Text>, agora insira seu número de telefone</Text>
    </Text>,
    stepIndex: 2,
    formItems: [
      {
        placeholder: 'Telefone',
        iconFamily: 'FontAwesome',
        iconName: 'phone-square',
      }
    ],
    phoneNumber: true,
  },
  {
    label:
    <Text style={styles.stepLabel}>
      <Text style={{ color: COLORS.primary }}>{context.nome}</Text>
      <Text>, insira seu e-mail{'\n'}</Text>
    </Text>,
    stepIndex: 3,
    formItems: [
      {
        placeholder: 'E-mail',
        iconFamily: 'MaterialCommunityIcons',
        iconName: 'email-outline',
      }
    ],
    email: true,
  },
  {
    label: <Text style={styles.stepLabel}>Perfeito, e qual é a sua data de nascimento?</Text>,
    stepIndex: 4,
    formItems: [
      {
        placeholder: 'Data de nascimento',
        iconFamily: 'AntDesign',
        iconName: 'calendar',
      }
    ],
    datePicker: true,
  },
  {
    label: <Text style={styles.stepLabel}>Para finalizar, escolha o condomínio onde reside</Text>,
    stepIndex: 5,
    formItems: [
      {
        placeholder: 'condo',
      }
    ],
  },
]

const styles = {
  stepLabel: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 26,
  },
};

export default generateSteps;