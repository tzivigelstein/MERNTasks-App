import React, { useRef, useState } from 'react';
import {
  Text,
  TextInput,
  Vibration,
  View,
  useWindowDimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './newtask.styles';
import Modal from 'react-native-modal';
import ErrorIcon from '../../components/ErrorIcon';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../GraphQL/mutations';
import { GET_PROJECTS } from '../../GraphQL/querys';
import CheckIcon from '../../components/CheckIcon';
import ClockIcon from '../../components/ClockIcon';
import theme from '../../Theme';

const MAX_LENGTH = 30;

const NewTask = ({ isVisible, setIsVisible }) => {
  const [state, setState] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);

  let width = useWindowDimensions().width;
  let height = useWindowDimensions().height;

  const inputRef = useRef();

  const [createProject] = useMutation(CREATE_PROJECT, {
    update(cache, { data: { createProject } }) {
      const { getProjects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { getProjects: getProjects.concat([createProject]) },
      });
    },
  });

  async function handleSubmit() {
    if (taskName === '') {
      setError(true);
      return;
    }

    try {
      await createProject({
        variables: {
          input: {
            name: taskName.trim(),
            state,
          },
        },
      });
      setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(text) {
    setError(false);
    setTaskName(text);
  }

  return (
    <Modal
      deviceWidth={width}
      deviceHeight={height}
      style={styles.modal}
      onModalShow={() => Vibration.vibrate(50)}
      onSwipeComplete={() => setIsVisible(!isVisible)}
      onBackButtonPress={() => setIsVisible(!isVisible)}
      onBackdropPress={() => setIsVisible(!isVisible)}
      backdropOpacity={0.5}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      isVisible={isVisible}>
      <TouchableWithoutFeedback onPress={() => inputRef.current.blur()}>
        <View style={styles.container}>
          <Text style={styles.title}>New task</Text>
          <View>
            <View>
              <Text style={styles.label}>Title</Text>
              <View
                style={[
                  styles.inputContainer,
                  focus
                    ? styles.textInputActive
                    : error
                    ? styles.textInputError
                    : {},
                ]}>
                <TextInput
                  ref={inputRef}
                  value={taskName}
                  maxLength={MAX_LENGTH}
                  onChangeText={text => handleChange(text)}
                  style={styles.textInput}
                  onFocus={() => setFocus(!focus)}
                  onBlur={() => setFocus(!focus)}
                  placeholderTextColor="rgba(0,0,0,0.6)"
                  placeholder="My amazing task"></TextInput>
                {error && (
                  <ErrorIcon
                    stroke="#d64550"
                    style={{
                      position: 'absolute',
                      right: 12,
                    }}
                  />
                )}
              </View>
            </View>
            <Text style={{ textAlign: 'right', margin: 3 }}>
              {taskName.length}/{MAX_LENGTH}
            </Text>
            <View style={styles.colorContainer}>
              <Text style={styles.colorTitleHelper}>
                Pick a state for your project 👇
              </Text>
              <View style={styles.statesContainer}>
                <TouchableOpacity
                  activeOpacity={theme.activeOpacity}
                  onPress={() => setState(false)}>
                  <View style={state ? {} : styles.activeFalseState}>
                    <View
                      style={[
                        styles.stateContainer,
                        { backgroundColor: theme.lightInfo },
                      ]}>
                      <ClockIcon stroke={theme.info} strokeWidth={3} />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={theme.activeOpacity}
                  onPress={() => setState(true)}>
                  <View style={state ? styles.activeTrueState : {}}>
                    <View
                      style={[
                        styles.stateContainer,
                        { backgroundColor: theme.lightSuccess },
                      ]}>
                      <CheckIcon stroke={theme.success} strokeWidth={3} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleSubmit}
              style={styles.button}>
              <Text style={styles.buttonText}>Create task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NewTask;
