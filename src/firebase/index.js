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

const db = firebase.firestore();
const firebaseLogin = ({ email, password }) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      db.collection("users")
        .doc("willianrigowow@gmail.com")
        .get()
        .then(doc => {
          if (!doc.exists) throw new Error('Dados do usuário não encontrados na base.')
          else return doc.data();
        })
    })
    .catch((error) => {
      if(String(error).includes('network')) {
        console.warn('Erro de conexão. Verifique sua internet e tente novamente.');
      // } else console.warn('Credenciais inválidas. Insira um e-mail e uma senha já cadastrados.');
    } else console.warn(String(error))
  });
}

const firebaseRegister = ({ email, password, name, phoneNumber, condoId, birthDate }) => {
  db.collection("users")
    .doc("willianrigowow@gmail.com")
    .get()
    .then(doc => {
      if (doc.exists) throw new Error('Email já cadastrado.')
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        // if (doc.exists) throw new Error('Email já cadastrado.')
      })
    })
  .catch(function(error) {
    throw new Error('Erro ao realizar o cadastro. Verifique sua conexão ou tente novamente mais tarde.');
  });
}

export {
  firebaseLogin,
  firebaseRegister,
}