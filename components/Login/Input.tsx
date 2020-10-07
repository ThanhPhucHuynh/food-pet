import React from 'react';
import { TextInput } from 'react-native-paper';

interface InputLoginRegisterProps {
  label: string;
  value: string;
  leftIcon?: string;
  rightIcon?: string;
  onChangeText: (text: any) => void;
  error?: boolean;
  check?: boolean;
  isChange: boolean;
  secureTextEntry?: boolean;
  onBlur?: (text: any) => void;
}

const InputLoginRegister = ({
  label,
  value,
  leftIcon,
  rightIcon,
  onChangeText,
  error,
  check,
  isChange,
  onBlur,
  secureTextEntry,
}: InputLoginRegisterProps) => {
  return (
    <TextInput
      mode="outlined"
      style={{ color: 'white', backgroundColor: 'white' }}
      underlineColor="silver"
      label={label}
      error={error}
      right={
        !isChange ? (
          ''
        ) : check ? (
          <TextInput.Icon name={rightIcon} color="#2cb9b0" />
        ) : error ? (
          <TextInput.Icon name="exclamationcircle" color="red" />
        ) : (
          ''
        )
      }
      value={value}
      selectionColor="white"
      left={
        <TextInput.Icon
          name={leftIcon}
          color={error ? 'red' : 'silver'}
          style={{ marginRight: 10 }}
        />
      }
      {...{ onBlur, onChangeText, secureTextEntry }}
    />
  );
};
export default InputLoginRegister;
