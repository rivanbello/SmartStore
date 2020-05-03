const validators = [
  {
    index: 0,
    rule: /[A-Za-zÀ-ÖØ-öø-ÿ]/,
  },
  {
    index: 1,
    rule: /^[0-9]*$/,
  },
  {
    index: 2,
    rule: /\S+@\S+\.\S+/,
  },
]

const validateField = (i, value) => (validators.filter(({ index }) => index === i))[0].rule.test(value);

export default validateField;