import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  title: string;
  onAction: () => void;
  backgroundColor: string;
  textColor: string;
  customButtonFontWeight: any;
  customButtonFontSize: number;
  width: any;
  height: number;
  marginVertical?: number
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onAction, backgroundColor, textColor, width, height, customButtonFontSize, customButtonFontWeight, marginVertical }) => {
  const [isLoading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    button: {
      borderRadius: 5,
      padding: 0,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: marginVertical
    },
    buttonText: {
      fontSize: customButtonFontSize,
      fontWeight: customButtonFontWeight,
      fontFamily: 'HelveticaNeue-Light',
    },
  });

  const handlePress = async () => {
    setLoading(true);
    await onAction();
    // Optionally reset loading state here or in onAction depending on the behavior you want
    setLoading(false);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.button, { backgroundColor, width, height }]}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
