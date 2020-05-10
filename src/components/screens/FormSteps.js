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
    type: 'phoneNumber',
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
    type: 'email',
  },{
    label:
    <Text style={styles.stepLabel}>
      <Text>Para manter suas compras seguras, insira uma senha com mais de 8 caracteres.</Text>
    </Text>,
    stepIndex: 4,
    formItems: [
      {
        placeholder: 'Senha',
        iconFamily: 'FontAwesome',
        iconName: 'lock',
      }
    ],
    formItems: [
      {
        placeholder: 'Confirme sua senha',
        iconFamily: 'FontAwesome',
        iconName: 'lock',
      }
    ],
    password: true,
    type: 'password',
  },
  {
    label: <Text style={styles.stepLabel}>Perfeito, e qual é a sua data de nascimento?</Text>,
    stepIndex: 5,
    formItems: [
      {
        placeholder: 'nascimento',
        iconFamily: 'AntDesign',
        iconName: 'calendar',
      }
    ],
    datePicker: true,
    type: 'datePicker',
  },
  {
    label: <Text style={styles.stepLabel}>Quase lá! Agora escolha o condomínio onde reside</Text>,
    stepIndex: 6,
    formItems: [
      {
        placeholder: 'condo',
      }
    ],
    type: 'condo',
  },
  {
    label: 
    <Text style={styles.stepLabel}>
      <Text>Por último, insira a senha do seu condomínio</Text>
    </Text>,
    helpLabel: <Text>Como conseguir a senha do meu condomínio?</Text>,
    stepIndex: 7,
    formItems: [
      {
        placeholder: 'Nome',
        iconFamily: 'FontAwesome',
        iconName: 'user-circle',
      }
    ]
  },
]

const styles = {
  stepLabel: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 26,
  },
  helpLabel: {
    color: COLORS.gray,
    fontSize: 16,
  }
};

export default generateSteps;