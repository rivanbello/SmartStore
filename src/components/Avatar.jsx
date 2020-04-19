import React from 'react';
import { Image, View, Text, StyleSheet } from "react-native";

import avatar from '../../assets/avatar.png';

const Avatar = ({ src }) => (
    <Image 
      style={styles.avatar} 
      source={src ? src : avatar}/>
);

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 15,
    width: 74,
    height: 74,
  },
});