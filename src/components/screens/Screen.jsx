import React, { useContext } from 'react';
import { SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { COLORS } from '../../constants';
import { LoadingContext } from '../../context';
import { Row } from '../layout';

const Screen = ({ children, style }) => {
  const [loadingObj] = useContext(LoadingContext);
  
  return (
    <SafeAreaView style={{ 
      ...styles.container,
      ...style,
    }}>
     
      {loadingObj.loading ?
        <Row style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small"/>
          <Text style={{ marginLeft: 15, color: COLORS.darkGray, fontSize: 20, }}>{loadingObj && loadingObj.label}</Text>
        </Row>
        : children
      }
    </SafeAreaView>
  )
};

const styles = {
  container: {
    width: '100%',
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 18,
  }
}

export default Screen;