import NetInfo from '@react-native-community/netinfo';

const checkNetworkStatus = async () => {
  const state = await NetInfo.fetch();
  if (state) return state.isConnected;
}

const monitorNetworkStatus = async (callback = () => {}) => {
    NetInfo.addEventListener(state => {
      state && callback(state.isConnected);
    })
}

export {
  checkNetworkStatus,
  monitorNetworkStatus,
}