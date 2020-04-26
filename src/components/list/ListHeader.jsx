import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';

const ListHeader = ({ label, collapsed = true, expandLabel, style }) => (
  <View
    style={{
      ...style,
      width: '100%', display: "flex",
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
  >
    <Text
      style={{
        fontSize: 19,
        fontWeight: 'bold',
        color: COLORS.darkestGray
      }}>
        {label}
    </Text>
    {collapsed
      &&
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 12, color: COLORS.primary, fontWeight: 'bold'
          }}>
            {expandLabel}
        </Text>
      </TouchableOpacity>
    }
  </View>
);

export default ListHeader;