const loadCondos = (posArr = []) => (
  Array.isArray(posArr) && posArr.map((pos) => {
    const name = `Cond. ${pos.localName}`;
    let condoInfo = {};
    condoInfo = getCondoAddress(pos.localName);

    // para tratar erros no nome vindo da AMLabs
    if (condoInfo.localName) pos.localName = condoInfo.localName;
    // console.warn('tokens: ', tokens)
    return({
      ...condoInfo,
      token: pos.token,
      name,
      machineCompanyCode: pos.machineCompanyCode,
      id: pos.id,
      distance: "15m",
    });
  }))

const getCondoAddress = (condoName) => {
  let condoInfo = {};
  switch (condoName) {
    case 'Spazio Castellon':
    case 'Spazio Castellon PDV1':
    case 'Spazio Castellon PDV2':
      condoInfo.address ="R. Profa. Maria Pilar Bórgia, 215";
      condoInfo.neighborhood = "Vila Carminha, Campinas - SP, 13045-410";
      break;
    case 'Topazio Ville':
      condoInfo.address = 'Av. São José dos Campos, 150';
      condoInfo.neighborhood = "Jardim Nova Europa, Campinas - SP";
      break;
    case 'Topazio Ville PDV1':
      condoInfo.address = 'Av. São José dos Campos, 150';
      condoInfo.neighborhood = "Jardim Nova Europa, Campinas - SP";
      break;
    case 'Bairro Jardim Nova Europa':
      condoInfo.address = 'R. Manuel Sylvestre de Freitas Filho, 75',
      condoInfo.neighborhood = "Jardim Nova Europa, Campinas - SP";
      break;

    case 'Ametista Villa':
    case 'Ametista Villa PDV2':
          //erro de digitação da AMLabs
    case 'Amestista Villa':
    case 'Ametista Ville':
      condoInfo.address = 'Rua Manoel Silvestre de Freitas Filho, 1277';
      condoInfo.neighborhood = "Jardim Nova Europa, Campinas - SP";
      break;

    case 'Parque dos Alecrins':
      condoInfo.address = 'Av. Carlos Diaulas Serpa';
      condoInfo.neighborhood = 'Campinas - SP, 13098-598';
      break;
    case 'Alta Vista':
      condoInfo.address = 'R. Vitória Randi, 135';
      condoInfo.neighborhood = 'Valinhos - SP';
      break;
    case 'Life Space':
      condoInfo.address = 'Avenida Visconde de Guarapuava, 3806';
      condoInfo.neighborhood = 'Curitiba - PR';
      break;
    case 'Rubi Ville': 
      condoInfo.localName = 'Rubi Ville'
      condoInfo.address = 'Bairro Jardim Nova Europa';
      condoInfo.neighborhood = 'Campinas - SP';
      break;
    case 'Turquesa Ville PDV 1':
      condoInfo.address = 'R. Santa Rita do Passa Quatro, 85';
      condoInfo.neighborhood = 'Jardim Nova Europa, Campinas - SP, 13040-108';
      break;
    case 'Brisa da Mata':
        condoInfo.address = 'Estr. da Coudelaria, 200';
        condoInfo.neighborhood = 'Vila Ipê, Campinas - SP, 13044-380';
        break;
    case 'nova europa':
        //erro da AMLabs no nome do condomínio
        condoInfo.localName = 'Cristal Ville';
        condoInfo.address = 'Rua Ubatuba, 140';
        condoInfo.neighborhood = 'Jardim Nova Europa, Campinas - SP, 13040-108';
        break;

    case 'Ilhas Gregas':
      condoInfo.address = 'R. Wanda dos Santos Mullmann, 1266';
      condoInfo.neighborhood = 'Vila Taruma, Pinhais - PR, 83323-123';
      break;

    case 'Ilhas do Mediterrâneo':
      condoInfo.address = 'R. Francisco Bueno Lacerda, 250';
      condoInfo.neighborhood = 'Parque Italia, Campinas - SP, 13036-265';
      break;
    default:
      condoInfo.address = '';
      condoInfo.neighborhood = '';
      break;
  }
  return condoInfo;
}

export { getCondoAddress, loadCondos };