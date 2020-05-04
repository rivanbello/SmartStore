import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';

const ListHeader = ({ label, collapsed = true, expandLabel, style }) => (
  <View
    style={{
      ...styles.container,
      ...style,
    }}
  >
    <Text
      style={{
        fontSize: 19,
        color: COLORS.darkLilac,
      }}>
        {label}
    </Text>
    {collapsed
      &&
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 13, color: COLORS.lilac, fontWeight: 'bold'
          }}>
            {expandLabel}
        </Text>
      </TouchableOpacity>
    }
  </View>
);

const styles = {
  container: {
    width: '100%', display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  }
}

export default ListHeader;