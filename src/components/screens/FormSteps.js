const createSteps = (context) => [
  {
    label: 'Vamos começar pelo seu nome',
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
    label: `Legal ${context.nome}, agora insira seu número de telefone`,
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
    label: '###, insira seu e-mail\n',
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
    label: 'Perfeito, e qual é a sua data de nascimento?',
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
]

export default createSteps;