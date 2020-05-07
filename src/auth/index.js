import { firebaseLogin } from '../firebase';

const login = ({ email, password }) => {
  //check for Async Storage
  return firebaseLogin({ email, password })
    .then((userInfo) => userInfo);
};

export { login }