import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const DoubleLabelButton = ({ labels = [], Icon }) => (
  <TouchableOpacity>
    {labels && <Text>{labels [0]}</Text>}
    <View>
      {labels && <Text>{labels[1]}</Text>}
      {Icon}
    </View>
  </TouchableOpacity>
);

export default DoubleLabelButton;