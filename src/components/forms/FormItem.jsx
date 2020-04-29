import React, { useState, useEffect } from 'react';
import { Row } from '../layout';
import {
  Animated,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import codes from './phoneCodes';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../../constants';
import { floatingLabel } from './animations';

const FormItem = ({
  Icon,
  style,
  placeholder,
  phoneNumber = false,
  datePicker = false,
  focused = false,
  password = false,
  RightIcon,
}) => {
  const [active, setActive] = useState(false);
  const [labelXPosition] = useState(new Animated.Value(10));
  const [labelYPosition] = useState(new Animated.Value(0));
  const [labelFontSize] = useState(new Animated.Value(14));
  const [inputHasContent, setInputHasContent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000))

  useEffect(() => {
    if (active) {
      floatingLabel([
        {
          position: labelXPosition,
          toValue: 0,
          duration: 150,
        },
        {
          position: labelYPosition,
            toValue: -14,
            duration: 150,
        },
        {
          position: labelFontSize,
          toValue: 10,
          duration: 150,
        }
    ])
    } else if (!inputHasContent) {
      floatingLabel([
        {
          position: labelXPosition,
          toValue:  34,
          duration: 150,
        },
        {
          position: labelYPosition,
          toValue:  5,
          duration: 150,
        },
        {
          position: labelFontSize,
          toValue:  14,
          duration: 150,
        }
      ]);
    }
  }, [active]);

  return (
    <Row style={{
      ...styles.container,
      ...style,
      borderColor: active ? COLORS.primary : COLORS.gray,
      borderWidth: datePicker ? 1 : 0,
      borderRadius: datePicker ? 24 : 0,
      height: datePicker ? 36 : 'auto',
      paddingHorizontal: datePicker ? 15 : 0,
    }}>
      <Icon.component
        name={Icon.name}
        size={Icon.size}
        style={active ? styles.iconActive : styles.icon}
      />
      {phoneNumber && active &&
        <Picker
          style={{
            height: 50,
            width: 100,
          }}
          itemStyle={{
            fontWeight: 'bold',
          }}
        >
          {codes.map(({ fone, nome }) => {
            fone = '+'+fone.replace(/^0+/, "");
            return <Picker.Item
              label={`${fone} (${nome})`}
              value={fone} />
          })}
        </Picker>
      }
      {datePicker &&
        <Text
          style={styles.date}
          onPress={() => setDatePickerOpen(true)}  
        >
          {date.getDate()}/
          {date.getMonth().length === 2 ? date.getMonth() : `0${date.getMonth()}`}/
          {date.getFullYear()}
        </Text>
      }
      {console.warn(datePickerOpen)}
      {datePicker && datePickerOpen &&
        <DateTimePicker
          value={date}
          mode="date"
          onChange={() => setDatePickerOpen(false)}
        />
      }
      {!datePicker && <Animated.View
          style={{
            left: labelXPosition,
            top: labelYPosition,
            position: 'absolute'
          }}
        >
        <Animated.Text
          style={{
            fontSize: labelFontSize,
            color: active ? COLORS.darkestGray : COLORS.gray,
           }}
        >
          {placeholder}
        </Animated.Text>
      </Animated.View>}
      {!datePicker && <TextInput
        style={{
          ...styles.input,
        }}
        autoFocus={focused}
        secureTextEntry={password && !showPassword}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChangeText={
          (text) => text.length > 0
          ? setInputHasContent(true)
          : setInputHasContent(false)
        }
      />}
      {RightIcon &&
        <TouchableOpacity
          style={{
            ...styles.rightIcon,
          }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <RightIcon.component
            name={showPassword ? RightIcon.activeName : RightIcon.name}
            size={RightIcon.size}
            style={{
              ...(active ? styles.iconActive : styles.icon),
              display: (!active ? 'none' : 'flex'),
            }}
          />
        </TouchableOpacity>
      }
    </Row>
  );
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderRadius: 5,
  },
  input: {
    marginLeft: 14,
    flex: 1,
  },
  date: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 30,
  },
  icon: {
    color: COLORS.gray,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
  },
  iconActive: {
    color: COLORS.primary,
  },
  placeholderView: {
    left: 30,
  },
});

export default FormItem;