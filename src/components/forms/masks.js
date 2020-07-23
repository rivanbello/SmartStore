const phoneNumberMask = (value) => {
    return '('
      .concat(
        value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1) $2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{5})(\d)/, '$1-$2')
        )
        .replace(/(-\d{4})\d+?$/, '$1');
  }
  
export { phoneNumberMask };