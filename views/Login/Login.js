import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './login.styles.js';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { AUTH_USER } from '../../GraphQL/mutations.js';
import Toast from '../../components/Toast/Toast.js';
import AsyncStorage from '@react-native-community/async-storage';
import useConnection from '../../hooks/useConnection.js';
import Heading from '../../components/Heading/Heading.js';
import ConnectionStatusIndicator from '../../components/ConnectionStatusIndicator/ConnectionStatusIndicator.js';

const Login = () => {
  const router = useNavigation();
  const [isConnected, connectionType] = useConnection();

  useEffect(() => {
    const token = getToken();
    token && router.navigate('Home');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getToken() {
    return await AsyncStorage.getItem('token');
  }

  const [focus, setFocus] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState({
    text: '',
    state: 'success',
    callback: () => setToast(false),
  });

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [authUser] = useMutation(AUTH_USER);

  function handleChange(text, target) {
    setUserData({
      ...userData,
      [target]: text,
    });
  }

  async function handleSubmit() {
    if (!isConnected) return;
    if (loading) return;
    setLoading(true);

    const { password } = userData;
    let { email } = userData;
    email = email.toLowerCase();

    if (email === '' || password === '') {
      setToast(true);
      setMessage({
        ...message,
        text: 'All fields are required',
        state: 'error',
      });

      setLoading(false);
    }

    try {
      const { data } = await authUser({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      const { text, state, token } = data.authUser;
      setToast(true);
      setMessage({
        ...message,
        text,
        state,
      });
      setLoading(false);
      if (state === 'success') {
        await AsyncStorage.setItem('token', token);
        router.navigate('Home');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const statusBarColor = useMemo(() => {
    if (isConnected) {
      if (connectionType === 'wifi') {
        return '#fff';
      } else {
        return '#ffc107';
      }
    } else {
      return '#d64550';
    }
  }, [isConnected, connectionType]);

  return (
    <>
      <StatusBar backgroundColor={statusBarColor} />
      <ConnectionStatusIndicator
        isConnected={isConnected}
        connectionType={connectionType}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          emailInputRef.current.blur();
          passwordInputRef.current.blur();
        }}>
        <View style={styles.container}>
          {toast && <Toast data={message} />}
          <Heading title="Login" />
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                autoCompleteType="email"
                onChangeText={text => handleChange(text, 'email')}
                ref={emailInputRef}
                onFocus={() => setFocus({ ...focus, email: true })}
                onBlur={() => setFocus({ ...focus, email: false })}
                style={[styles.input, focus.email ? styles.inputActive : {}]}
                placeholderTextColor="#696969"
                placeholder="Email"></TextInput>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                onChangeText={text => handleChange(text, 'password')}
                ref={passwordInputRef}
                onFocus={() => setFocus({ ...focus, password: true })}
                onBlur={() => setFocus({ ...focus, password: false })}
                style={[styles.input, focus.password ? styles.inputActive : {}]}
                placeholderTextColor="#696969"
                placeholder="Password"
                secureTextEntry={true}></TextInput>
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.button}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ margin: 16 }}
            onPress={() => router.navigate('Signup')}>
            <Text style={styles.helper}>
              Don't have an account?
              <Text style={styles.helperHighlight}> Signup</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Login;
