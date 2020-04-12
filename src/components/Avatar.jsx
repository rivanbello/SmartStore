import React from 'react';
import { Image, View, Text, StyleSheet } from "react-native";

import avatar from '../../assets/avatar.png';

const Avatar = ({ src }) => (
  <View style={styles.container}>
    <Image 
      style={styles.avatar} 
      source={src ? src : avatar}/>
  </View>
);

export default Avatar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  avatar: {
    width: 65,
    height: 65
  },
});