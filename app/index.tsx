import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView, Keyboard  } from 'react-native';

import { ColorScheme } from '../constants/colorScheme';
import CustomInput from '../components/atoms/customInput';
import CustomButton from '../components/atoms/customButton';
import { AntDesign } from '@expo/vector-icons';
import { Link, router} from 'expo-router';
import { useAuth } from '@/modules/auth/authHooks';

interface FormFields {
  email: string;
  password: string;
  [key: string]: string; // Adding index signature
}

type ErrorField = 'email' | 'password';

const SignIn = () => {
  const { signInWithEmail } = useAuth();
  const [form, setForm] = useState<FormFields>({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const handleInputChange = useCallback((name: string, value: string) => {
    setForm(currentForm => ({ ...currentForm, [name]: value }));
    // Optionally reset errors
    setErrors(currentErrors => ({ ...currentErrors, [name]: '' }));
  }, []);

  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: '', password: '' };

    if (!form.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const buttonAction = async () => {
    if (!validateForm()) return;
    const response = await signInWithEmail(form.email, form.password);
    if (response.data && response.data.uid) {
      router.replace('/countries');
    } else {
      setErrors({ ...errors, password: 'Wrong email or password' });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.flexOne}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView contentContainerStyle={styles.flexGrowOne}>
          <View style={styles.container}>
            <Text style={styles.loginText}>Login</Text>
            {['email', 'password'].map((field) => (
              <CustomInput
                key={field}
                textColor={ColorScheme.GreyWhite}
                backgroundColor={ColorScheme.GraphitePrimary}
                label={field === 'email' ? 'Email Address' : 'Password'}
                value={form[field]}
                onInputChange={(value) => handleInputChange(field, value)}
                errorText={errors[field as ErrorField]}
                autoFocus={false}
                secureTextEntry={field === 'password'}
                marginTop={field === 'email' ? 0 : 10}
                width={300}
              />
            ))}
           
           <CustomButton
              title="LOGIN"
              onAction={buttonAction}
              backgroundColor={ColorScheme.MagentaPrimary}
              textColor="#fff"
              width={300} // Adjusted width to fit three buttons
              height={50}
              customButtonFontSize={20}
              customButtonFontWeight={400}
              marginVertical={30}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ColorScheme.GraphitePrimary,
  },
  flexOne: {
    flex: 1,
  },
  flexGrowOne: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 34,
    fontWeight: '600',
    color: ColorScheme.GreyWhite,
    marginBottom: 15,
  },
});
