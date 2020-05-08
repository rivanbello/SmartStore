import { firebaseLogin, firebaseRegister } from '../firebase';

const login = ({ email, password }) => {
  //check for Async Storage
  return firebaseLogin({ email, password })
    .then((userInfo) => userInfo);
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