import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../constants';
import { Row } from '../layout';
import Screen from './Screen';

const InformationScreen = ({ navigation }) => (
  <Screen>
    {/* <StackHeader
      onPress={() => navigation.popToTop()}
    /> */}
    <ScrollView>
      <Text style={styles.pageTitle}>Informações</Text>
      <Text style={styles.title}>
        Sobre esse aplicativo:
      </Text>
      <Text style={styles.content}>
        Seja muito bem vindo ao seu aplicativo do morador! Aqui você pode verificar preços e estoque da loja do seu condomínio, bem como fazer sugestões, receber ofertas e tirar dúvidas. E sabe o melhor? Tem muita novidade por vir, mantenha seu aplicativo sempre atualizado!
      </Text>
      <Text style={styles.title}>
        Compra de bebidas
      </Text>
      <Text style={styles.content}>
      Para comprar sua bebida, caso você seja maior de idade no cadastro realizado, você observará abaixo um botão "Cartão +18" basta clicar e escanear no leitor de código de barras da sua SmartStore.
      </Text>
      <Text style={styles.title}>
        F.A.Q.
      </Text>
      <View style={styles.separationLine} />
      <FAQItem
        title="Quais as bandeiras aceitas na SmartStore?"
        description="Aceita pagamentos em cartão de débito e cartão de crédito, sendo: Visa, MasterCard, Elo, HiperCard, Hiper e Amex."
      />
      <FAQItem
        title="Por que fica aberto sem proteção dos itens?"
        description="Acreditamos nas pessoas. Quermos levar sempre comodidade e conforto para os moradores. Os ambientes são monitorados por câmera IP de rastreamento inteligente, fornecendo maior proteção aos condôminos. Nos ajude a cuidar desse espaço, ele foi entregue com carinho e confiança a você."
      />
      <FAQItem
        title="Gostaria comprar itens ainda não disponiveis na minha SmartStore, como faço?"
        description="Como a SmartStore tem como proposta ser uma micro conveniência, o limite de espaço nos faz trabalhar com os itens mais interessantes para cada condomínio. Sempre que tiver uma sugestão de item, basta nos enviar via WhatsApp e avaliaremos com carinho a possibilidade de incluir. Alguns condomínios preferem itens do dia-a-dia, outros preferem ter a disposição petiscos, queijos e vinhos. Somente juntos e com sua sugestão chegaremos ao modelo ideal do seu condomínio =)."
      />
      <FAQItem
        title="Qual é a frequência de abastecimento?"
        description="O abastecimento é feito todos os dias as 19:30, dependendo da demanda. Em condomínios de alto fluxo de uso, em alguns dias fazemos 2 vezes para suprir o estoque. Em outros, com fluxo mais baixo a reposição é dia sim, dia não. Sempre prezando pelo pleno abastecimento no maior periodo de tempo possível."
      />
      <FAQItem
        title="E se eu descer do meu apartamento e não tiver o item, perdi viagem?"
        description={`Graças a esse link web que você está, temos o botão "Ver estoque". Nele é possível ver todo o estoque da sua SmartStore em tempo real, sem precisar sair de casa.`}
      />
      <FAQItem
        title="Agora com a Pandemia do Coronavirus, como é feita a prevenção?"
        description="Ao lado do caixa, disponibilizamos alcool gel para higienização das mãos antes e após o uso do sistema. Além disso, todos os dias durante o abastecimento é realizada a limpeza das maçanetas de geladeiras e frezzers, bem como do totem de pagamento com álcool 70%."
      />
      <TouchableOpacity
        style={styles.feedback}
        onPress={() => navigation.navigate('Suggestion')}
      >
        <Text style={styles.feedbackText}>Envie seu feedback</Text>
      </TouchableOpacity>
      <View style={{ height: 40}} />
    </ScrollView>
  </Screen>
);

const FAQItem = ({ title, description }) => {
  const [active, setActive] = useState(false);
  return (<TouchableOpacity onPress={() => setActive(!active)}>
      <Row style={{ justifyContent: 'space-between' }}>
        <Text style={styles.FAQTitle}>{title}</Text>
        {active ? <View
          transform={[{rotateZ: '45deg'}]}
        >
          <Text
            style={styles.expand}
          >+</Text>
        </View>
        : <View
      >
        <Text
          style={styles.expand}
        >+</Text>
      </View>}
          
      </Row>
      {active && <Text style={styles.content}>
        {description}
      </Text>}
    <View style={styles.separationLine} />
  </TouchableOpacity>)
}

const styles = {
  pageTitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  feedback: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.salmon,
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 30,
  },
  feedbackText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    fontSize: 26,
    marginTop: 22,
    marginBottom: 18,
  },
  content: {
    color: COLORS.lilac,
    marginBottom: 13,
  },
  separationLine: {
    borderTopWidth: 1,
    borderColor: COLORS.lilac,
    width: 1200,
    left: -200,
  },
  expand: {
    color: COLORS.primary,
    fontSize: 22,
  },
  FAQTitle: {
    fontWeight: 'bold',
    marginTop: 13,
    maxWidth: '90%',
    marginBottom: 10,
    color: COLORS.textPrimary,
  },
}

export default InformationScreen;