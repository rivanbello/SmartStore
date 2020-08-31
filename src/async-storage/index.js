import { AsyncStorage } from 'react-native';
const getStoredUserInfo = async () => {
  const info = await JSON.parse(AsyncStorage.getItem('userInfo'));

};

export { getStoredUserInfo }