const validators = [
  {
    index: 0,
    rule: /[A-Za-zÀ-ÖØ-öø-ÿ]/,
    minLegth: 2,
  },
  {
    index: 1,
    rule:  /^[0-9]{0,}$/,
    minLength: 11,
  },
  {
    index: 2,
    rule: /\S+@\S+\.\S+/,
  },
  {
    index: 3,
    minLength: 8,
  },
  {
    index: 7,
    equalTo: 'Smart*2020',
  },
]

const validateField = (i, value) => {
  const validator = (validators.filter(({ index }) => index === i))[0];
  const { rule, minLength, maxLength, equalTo } = validator;
  if (equalTo && value !== equalTo) return false;
  if (minLength && value.length < minLength) return false;
  if (maxLength && value.length > maxLength) return false;
  if (rule) return rule.test(value);
  return true;
}

export default validateField;