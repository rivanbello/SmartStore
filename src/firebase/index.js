import * as firebase from 'firebase';

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

const login = ({ setUserLogged, username, password, setError }) => {
  firebase.auth().signInWithEmailAndPassword(username, password)
  .then(() => setUserLogged())
  .catch(function(error) {
    if(error.includes('network')) {
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    } else setError('Credenciais inválidas. Insira um e-mail e uma senha já cadastrados.');
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

export {
  login,
}