import React from 'react';
import { Image, StyleSheet } from "react-native";
import { COLORS } from '../../constants';

const Avatar = ({ src, style }) => (
    <Image 
      style={{ ...styles.avatar, ...style}} 
      source={src ? src : null}/>
);

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 15,
    width: 74,
    height: 74,
  },
});

export default Avatar;