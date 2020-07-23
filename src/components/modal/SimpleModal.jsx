import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Link } from '../buttons';
import { Row } from '../layout';
import { COLORS } from '../../constants';

const SimpleModal = ({
    title,
    options = [],
    style,
}) => (
    <View style={{ ...styles.modal, ...style}}>
      <Text style={styles.modalContent}>{title}</Text>
      <Row style={{ justifyContent: 'space-between' }}>
        {options.map(({ label, onPress, color }) =>{
          const labelStyle= color ? { backgroundColor: color, color: '#fff', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 15, } : {};
          return <Link labelStyle={labelStyle} onPress={() => onPress()} label={label} />
        }
        )}
      </Row>
    </View>
);

const styles = StyleSheet.create({
    modal: {
        borderRadius: 8,
        width: '100%',
        position: 'absolute',
        top: '0%',
        padding: 20,
        shadowColor: "#000",
        backgroundColor: 'white',
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.30,
        shadowRadius: 1.41,
        elevation: 10,
      },
      modalContent: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 8,
        flex: 1,
        color: COLORS.primary,
        fontWeight: 'bold',
      },
});

export default SimpleModal;