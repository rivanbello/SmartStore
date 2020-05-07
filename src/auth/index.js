import { firebaseLogin } from '../firebase';

const login = ({ email, password }) => {
  //check for Async Storage
  return firebaseLogin({ email, password })
    .then((userInfo) => userInfo);
};

const register = ({
  email,
  password,
  name,
  phoneNumber,
  birthDate,
}) => {
  return firebaseRegister({
    email,
    password,
    name,
    phoneNumber,
    birthDate,
    condoId,
  }).then(userInfo => userInfo);
}

export { login, register };