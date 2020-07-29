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
      pointOfSaleToken,
 }) => {
    const body = {
      amount,
      cardNumber,
      cardCvv,
      items,
      cardExpirationMonth,
      cardExpirationYear,
      cardHolderCPF,
      cardHolderName: cardHolderName && cardHolderName.toUpperCase(),
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
      pointOfSaleToken
    };
    try {
      // console.warn('req: ', body)
        const response = await fetch(`https://painel.tahnamao.com.br/smartstore/pay`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body),
        });
      if (response.status !== 200) throw new Error();
       return response;
    } catch (error) {
      console.warn('request error', JSON.stringify());
      throw error;
    } 
  }
  
  export default pay;