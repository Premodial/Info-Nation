import React from 'react';
import { TextInput as PaperTextInput, HelperText } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';
import {ColorScheme} from '../../constants/colorScheme'

interface CustomInputProps {
    label: string;
    onInputChange: (text: string) => void;
    value: string;
    textColor: string;
    backgroundColor?: string;
    errorText: string;
    autoFocus: boolean,
    width: any,
    marginTop: number,
    icon? :{
      onPress: () => void;
      name: any;
    },
    secureTextEntry?: boolean,
    editable?: boolean;

}

const customInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onInputChange,
  errorText,
  autoFocus,
  width,
  marginTop,
  backgroundColor,
  icon,
  secureTextEntry,
  textColor,
  editable = true,
}) => {

  const styles = StyleSheet.create({
    input: {
      width: width,
      marginTop: marginTop,
      backgroundColor: backgroundColor,
      color: 'white'
    },
    errorText: {
      color: ColorScheme.TangerineSecondary, // Customize error color as needed
      marginBottom: -10, 
      textAlign:'left',
      width: 300
    }
  });

  return (
   <>
    <PaperTextInput
      label={label}
      value={value}
      onChangeText={onInputChange}
      mode="outlined"
      autoFocus={autoFocus}
      outlineColor={!!errorText ? ColorScheme.TangerineSecondary : ColorScheme.InacticeGrey}
      activeOutlineColor={!!errorText ? ColorScheme.TangerineSecondary: ColorScheme.MagentaPrimary}
      style={styles.input}
      secureTextEntry={secureTextEntry}
      textColor={textColor}
      editable={editable}
      right={<PaperTextInput.Icon  icon={icon?.name} onPress={icon?.onPress} />}
      textContentType={secureTextEntry ? 'password' : 'none'}

      />
         {errorText && ( // Conditionally render the error message
        <HelperText type="error" visible={!!errorText} style={styles.errorText}>
          {errorText}
        </HelperText>
      )}
   </>
  );
};



export default customInput
