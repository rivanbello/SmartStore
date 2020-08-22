import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJKp6gsQHpmJ5_5IneGlhwKGZjFmdrF0s",
  authDomain: "smartstore-1ee85.firebaseapp.com",
  databaseURL: "https://smartstore-1ee85.firebaseio.com",
  projectId: "smartstore-1ee85",
  storageBucket: "smartstore-1ee85.appspot.com",
  messagingSenderId: "564620633956",
  appId: "1:564620633956:web:44d3f3e23bede8159abc71",
  measurementId: "G-T8C9DWMGLQ"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const getUserInfo = ({ email }) => db
  .collection("users")
  .doc(email)
  .get()
  .then(doc => {
    if (!doc.exists) throw new Error('Dados do usuário não encontrados na base.')
    else return doc.data();
});

const getTokens = async () => {
  const db = firebase.firestore();
  const collection = await db.collection('tokens').get();
  return collection.docs.map(i => i.data().token);
};

const firebaseResetPassword = ({ email }) => firebase.auth().sendPasswordResetEmail(email);

const db = firebase.firestore();
const firebaseLogin = ({ email, password }) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      return getUserInfo({ email });
    })
    .catch((error) => {
      console.warn('erro 1: ,', String(error))
      if(String(error).includes('network') || String(error).includes('could not reach')) {
        throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
    } else if(String(error).includes('record') || String(error).includes('invalid')) {
      throw new Error('Credenciais inválidas.')
    } else if (String(error).includes('Too many')) {
      throw new Error('Muitas tentativas seguidas. Tente novamente em alguns minutos.')
    }
  });
}

const firebaseRegister = ({ email, password, name, phoneNumber, machineCompanyCode, birthDate, condoId }) => {
  return db.collection("users")
    .doc(email)
    .get()
    .then(doc => {
      if (doc.exists) throw new Error('Email já cadastrado.')
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection('users')
        .doc(email)
        .set({
          email: email.toLowerCase(),
          name,
          phoneNumber,
          condoId,
          machineCompanyCode,
          birthDate,
        })
        .then(() => getUserInfo({ email }))
      })
    })
  .catch(function(error) {
    if (error.message = 'Email já cadastrado.') throw error;
    throw new Error('Erro ao realizar o cadastro. Verifique sua conexão ou tente novamente mais tarde.');
  });
};

const checkIfEmailIsUsed = ({ email }) => {
  return db.collection("users")
  .doc(email)
  .get()
  .then(doc => {
    if (doc.exists) throw new Error('Email já cadastrado.')
  });
};

export {
  firebaseLogin,
  firebaseRegister,
  firebaseResetPassword,
  checkIfEmailIsUsed,
  getTokens,
}