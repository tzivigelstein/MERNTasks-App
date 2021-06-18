import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StatusBar,
} from 'react-native';
import styles from './signup.styles.js';
import { useNavigation } from '@react-navigation/native';
import Toast from '../../components/Toast/Toast.js';
import AsyncStorage from '@react-native-community/async-storage';

import { useMutation } from '@apollo/client';
import { CREATE_USER, AUTH_USER } from '../../GraphQL/mutations.js';

const Signup = () => {
  const router = useNavigation();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState({
    text: '',
    state: 'success',
    callback: () => setToast(false),
  });

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [focus, setFocus] = useState({
    name: false,
    email: false,
    password: false,
  });

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [createUser] = useMutation(CREATE_USER);
  const [authUser] = useMutation(AUTH_USER);

  function handleChange(text, target) {
    setUserData({
      ...userData,
      [target]: text,
    });
  }

  async function handleSubmit() {
    if (loading) return;
    setLoading(true);

    const { name, password } = userData;
    let { email } = userData;
    email = email.toLowerCase();

    if (name === '' || email === '' || password === '') {
      setToast(true);
      setMessage({
        ...message,
        text: 'All fields are required',
        state: 'error',
      });

      setLoading(false);
    }

    if (name.length < 3) {
      setToast(true);
      setMessage({
        ...message,
        text: 'Name must be at least 3 characters',
        state: 'error',
      });

      setLoading(false);
    }

    if (password.length < 6) {
      setToast(true);
      setMessage({
        ...message,
        text: 'Password must be at least 6 characters',
        state: 'error',
      });

      setLoading(false);
    }

    try {
      const { name, email, password } = userData;
      const { data } = await createUser({
        variables: {
          input: {
            name,
            email,
            password,
          },
        },
      });
      const { text, state } = data.createUser;
      setLoading(false);
      setToast(true);
      setMessage({
        ...message,
        text,
        state,
      });

      if (state === 'success') {
        setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        nameInputRef.current.blur();
        emailInputRef.current.blur();
        passwordInputRef.current.blur();
      }}>
      <StatusBar backgroundColor="#fff" />
      <View style={styles.container}>
        <>
          {toast && <Toast data={message} />}
          <Text style={styles.heading}>
            Signup to <Text style={styles.headingBold}>MERN</Text>Tasks
          </Text>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                onChangeText={text => handleChange(text, 'name')}
                value={userData.name}
                ref={nameInputRef}
                onFocus={() => setFocus({ ...focus, name: true })}
                onBlur={() => setFocus({ ...focus, name: false })}
                style={[styles.input, focus.name ? styles.inputActive : {}]}
                placeholderTextColor="#696969"
                placeholder="Name"></TextInput>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                onChangeText={text => handleChange(text, 'email')}
                value={userData.email}
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
                value={userData.password}
                ref={passwordInputRef}
                onFocus={() => setFocus({ ...focus, password: true })}
                onBlur={() => setFocus({ ...focus, password: false })}
                style={[styles.input, focus.password ? styles.inputActive : {}]}
                placeholderTextColor="#696969"
                placeholder="Password"
                secureTextEntry={
                  userData.password.length !== 0 ? true : false
                }></TextInput>
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.button}
              onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Signup</Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{ margin: 16 }}
            onPress={() => router.navigate('Login')}>
            <Text style={styles.helper}>
              You have an account?
              <Text style={styles.helperHighlight}> Login</Text>
            </Text>
          </TouchableOpacity>
        </>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
