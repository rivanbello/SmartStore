function validCreditCard(value) {
    // accept only digits, dashes or spaces
      if (/[^0-9-\s]+/.test(value)) return false;
  
      // The Luhn Algorithm. It's so pretty.
      var nCheck = 0, nDigit = 0, bEven = false;
      value = value.replace(/\D/g, "");
  
      for (var n = value.length - 1; n >= 0; n--) {
          var cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);
  
          if (bEven) {
              if ((nDigit *= 2) > 9) nDigit -= 9;
          }
  
          nCheck += nDigit;
          bEven = !bEven;
      }
  
      return (nCheck % 10) == 0;
  }
  
  const validCpf = (inputCPF) => {
    inputCPF = inputCPF.replace(/\D/g,'');
    if (inputCPF.length !== 11) return false;

    let soma = 0;
    let resto;

    if(inputCPF == '00000000000') return false;
    for(let i=1; i<=9; i++) soma = soma + parseInt(inputCPF.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)) resto = 0;
    if(resto != parseInt(inputCPF.substring(9, 10))) return false;

    soma = 0;
    for(let i = 1; i <= 10; i++) soma = soma + parseInt(inputCPF.substring(i-1, i))*(12-i);
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)) resto = 0;
    if(resto != parseInt(inputCPF.substring(10, 11))) return false;
    return true;
}

  export {
    validCreditCard,
    validCpf,
  };