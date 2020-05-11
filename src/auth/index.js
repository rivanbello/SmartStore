import { firebaseLogin, firebaseRegister } from '../firebase';

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
  birthDate,
  condoId,
}) => {
  return await firebaseRegister({
    email,
    password,
    name,
    phoneNumber,
    birthDate,
    condoId,
  })
}

export { login, register };