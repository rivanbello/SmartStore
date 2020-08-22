import React from 'react';
import { Image, StyleSheet, View, Text } from "react-native";
import { COLORS } from '../../constants';

const Avatar = ({ src, style, product = false, overlayImage = false }) => (
  product ?
  <View>
    <Image
      style={{ ...styles.avatar, ...style, }} 
      source={src ? { uri: String(src) } : null}
    />
    {/* <View style={styles.plusSign}> */}
        <Text style={{ ...styles.plusSign, textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 22 }}>+</Text>
      {/* </View> */}
  </View>
  : <Image
    style={{ ...styles.avatar, ...style}} 
    source={src ? { uri: String(src) } : null}
  />
);

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.gray,
    borderRadius: 15,
    width: 74,
    height: 74,
  },
  plusSign: {
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 22,
    height: 22,
    lineHeight: 24,
  },
});

export default Avatar;