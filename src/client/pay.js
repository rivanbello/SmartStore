const pay = async ({
      amount,
      cardNumber,
      cardCvv,
      cardExpirationMonth,
      cardExpirationYear,
      cardHolderCPF,
      cardHolderName,
      documentType,
      documentNumber,
      phoneAreaCode,
      phoneNumber,
      birthDate,
      senderName,
      items,
      senderEmail,
      street,
      number,
      // complement: "1",
      district,
      city,
      state,
      postalCode,
      pointOfSaleId,
      pointOfSaleToken,z
 }) => {
    try {
      let posLists = [];
      tokens = tokens.slice(0, 4);
      for await (let token of tokens) {
        const response = await fetch(`painel.tahnamao.com.br/smartstore-api`, {
          method: 'POST',
          body: {
            amount,
            cardNumber,
            cardCvv,
            items,
            cardExpirationMonth,
            cardExpirationYear,
            cardHolderCPF,
            cardHolderName,
            documentType,
            documentNumber,
            phoneAreaCode,
            phoneNumber,
            birthDate,
            senderName,
            senderEmail,
            street,
            number,
            // complement: "1",
            district,
            city,
            state,
            postalCode,
            pointOfSaleId,
            pointOfSaleToken,
          },
        });
        let pushArr = [];
        for await (let pos of (await response.json())) {
          try {
            const res = await fetch(`https://touchpay-api.amlabs.com.br/api/public/MicroMarket/${pos.id}/Inventory`, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            })
            // if (res.status !== 500)
            pos.token = token;
            if (res.status === 200) pushArr.push(pos);
          } catch (error) {
            return false;
          }
        }
        posLists = posLists.concat(pushArr);
      }
      return posLists;
    } catch (error) {
      console.warn('request error', error);
    } 
  }
  
  export default pay;