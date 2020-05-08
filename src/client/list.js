const all = async ({ limit = 10, listedIds, pointOfSaleId }) => {
  try {
    const response = await fetch(`https://touchpay-api.amlabs.com.br/api/public/MicroMarket/${pointOfSaleId}/Inventory`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwianRpIjoiMTg5YTFiMDgtYWVjMi00OGUzLWIxZjItMjE2NjMzMGE4M2RkIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUHVibGljIEFQSSIsImV4cCI6MTg5MzQ2NjgwMCwiaXNzIjoiTWVyY3VyaW8iLCJhdWQiOiIyNjgifQ.nOYlTCgeXX18kwje7aRkuISd7qBXhOBr0YB0h3SHr3g'
      },
    });

    return (await response.json());
  } catch (error) {
    console.warn('request error', error);
  }  
};

export default all;

// Instruções para uso da API

// Inserir o seguinte token do header Authorization para todos os requests:

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwianRpIjoiMTg5YTFiMDgtYWVjMi00OGUzLWIxZjItMjE2NjMzMGE4M2RkIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUHVibGljIEFQSSIsImV4cCI6MTg5MzQ2NjgwMCwiaXNzIjoiTWVyY3VyaW8iLCJhdWQiOiIyNjgifQ.nOYlTCgeXX18kwje7aRkuISd7qBXhOBr0YB0h3SHr3g

// Endpoint para consulta de estoque
// GET
// https://touchpay-api.amlabs.com.br/api/public/MicroMarket/{pointOfSaleId}/Inventory
// pointOfSaleId: ID do ponto de venda no sistema web TouchPay (inteiro)

// Resposta:
// [
// 	{
// 	  "id": 29, // ID do produto no sistema TouchPay (inteiro)
// 	  "code": "COCA-012", // Código do produto, especificado pelo cliente, no sistema TouchPay (string)
// 	  "description": "Coca-Cola Zero 350 ml", // Descrição / nome do produto (string)
// 	  "price": 3.5, // Preço do produto conforme cadastrado no planograma (decimal)
// 	  "quantity": 8, // Quantidade atual do produto (inteiro)
// 	  "categoryName": "Refrigerantes", // Categoria do produto (string)
// 	}
// ]

// import * as firebase from 'firebase';

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyDNJ30XqsWOopfnAdPr6gAF13b3wKY9-zI",
//   authDomain: "<YOUR-AUTH-DOMAIN>",
//   databaseURL: "<YOUR-DATABASE-URL>",
//   storageBucket: "smartstore-6f7a6.appspot.com",
//   measurementId: "<YOUR-MEASUREMENT-ID>"
// };

// firebase.initializeApp(firebaseConfig);