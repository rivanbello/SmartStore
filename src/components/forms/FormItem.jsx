import React, { useState, useEffect, useRef } from 'react';
import { Row } from '../layout';
import {
  Animated,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
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
  type,
  setFormValue,
  savedValue,
  RightIcon,
}) => {
  const [active, setActive] = useState(false);
  const [labelXPosition] = useState(new Animated.Value(10));
  const [labelYPosition] = useState(new Animated.Value(0));
  const [labelFontSize] = useState(new Animated.Value(14));
  const [inputHasContent, setInputHasContent] = useState(!!savedValue);
  const [showPassword, setShowPassword] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [date, setDate] = useState(new Date(946692000000));
  const [phoneCode, setPhoneCode] = useState('+55');
  const [maskedInputValue, setMaskedInputValue] = useState('');

  const appendToPosition = (target, position, value) => {
    if (target.length < position) return target;
    return [target.slice(0, position), value, target.slice(position)].join('');
  }

  const onChangeText = (text) => {
    let value = text

    if (phoneNumber && phoneCode === '+55') {
      if (value.length === 1) {
        if (Number(value[0])) value = appendToPosition(value, 0, '(')
        else value = '';
      }
      if (value.length === 4) {
        if (Number(value[3])) {
          value = appendToPosition(value, 3, ')');
          value = appendToPosition(value, 4, ' ');
        } else value = value.slice(0, 3);
      }
      if (value.length === 11) {
        if (Number(value[10])) value = appendToPosition(value, 10, '-');
        else value = value.slice(0, 10);
      }
      setMaskedInputValue(value);
      value = value.replace(/[)(-]/, '');
      value = value.replace(')', '');
      value = value.replace('-', '');
      value = value.replace(' ', '');
    }
    setFormValue(value);
    if (value.length > 0) setInputHasContent(true)
    else setInputHasContent(false)
  };

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
      height: datePicker ? 36 : 36,
      paddingHorizontal: datePicker ? 15 : 0,
    }}>
      <Icon.component
        name={Icon.name}
        size={Icon.size}
        style={active ? styles.iconActive : styles.icon}
      />
      {/* {phoneNumber && active &&
        <Picker
          style={{
            height: 50,
            width: 100,
            overflow: 'hidden',
          }}
          itemStyle={{
            margin: 0,
            fontWeight: 'bold',
            color: 'red',
            width: 10,
          }}
        >
          {codes.map(({ fone: phone, nome, iso }) => {
            phone = '+'+phone.replace(/^0+/, "")+' ('+iso+')';
            return <Picker.Item
              label={!pickerClosed ? `${phone}` : phone}
              value={phone}
              style={{ backgroundColor: 'red'}}
            />
          })}
        </Picker> 
      } */}
      {datePicker &&
        <Text
          style={styles.date}
          onPress={() => setDatePickerOpen(true)}  
        >
          {date.getDate().toString().length > 1 ? date.getDate() : `0${date.getDate()}`}/
          {(date.getMonth() + 1).toString().length > 1 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}/
          {date.getFullYear()}
        </Text>
      }
      {datePicker && datePickerOpen &&
        <DateTimePicker
          value={date}
          mode="date"
          onChange={
            (e, date) => {
              setDatePickerOpen(false);
              if (date && date.getMonth) setDate(date);
              setFormValue(date);
            }
          }
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
        maxLength={phoneNumber ? 15 : 50}
        keyboardType={phoneNumber ? "numeric" : "default"}
        autoFocus={focused}
        secureTextEntry={type === 'password' && !showPassword}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        value={phoneNumber ? maskedInputValue : savedValue}
        onChangeText={onChangeText}
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