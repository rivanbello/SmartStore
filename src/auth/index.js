import { firebaseLogin, firebaseRegister, checkIfEmailIsUsed } from '../firebase';

const login = async ({ email, password }) => {
  //check for Async Storage
  const res = await firebaseLogin({ email, password })
  return res;
};

const register = async ({
  email,
  password,
  name,
  phoneNumber,
  condoId,
  birthDate,
  machineCompanyCode,
}) => {
  return await firebaseRegister({
    email,
    password,
    name,
    phoneNumber,
    condoId,
    birthDate,
    machineCompanyCode,
  })
}

export { login, register, checkIfEmailIsUsed };