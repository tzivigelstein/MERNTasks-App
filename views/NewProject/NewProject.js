import React, { useRef, useState } from 'react';
import {
  Text,
  TextInput,
  Vibration,
  View,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './newproject.styles';
import Modal from 'react-native-modal';
import Colors from '../../components/Colors/Colors';
import COLORS from '../../components/COLORS';
import ErrorIcon from '../../components/ErrorIcon';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../../GraphQL/mutations';
import { GET_PROJECTS } from '../../GraphQL/querys';

const MAX_LENGTH = 18;

const NewProject = ({ isVisible, setIsVisible }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);

  let width = useWindowDimensions().width;
  let height = useWindowDimensions().height;

  const inputRef = useRef();
  const flatListRef = useRef();

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
    if (projectName === '') {
      setError(true);
      return;
    }

    try {
      await createProject({
        variables: {
          input: {
            name: projectName.trim(),
            colors: selectedColor,
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
    setProjectName(text);
  }

  function scrollToItemOnPress(item) {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: '' + item,
      viewPosition: 0.5,
    });
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
          <Text style={styles.title}>New project</Text>
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
                  value={projectName}
                  maxLength={MAX_LENGTH}
                  onChangeText={text => handleChange(text)}
                  style={styles.textInput}
                  onFocus={() => setFocus(!focus)}
                  onBlur={() => setFocus(!focus)}
                  placeholderTextColor="rgba(0,0,0,0.6)"
                  placeholder="My amazing project"></TextInput>
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
              {projectName.length}/{MAX_LENGTH}
            </Text>
            <View style={styles.colorContainer}>
              <Text style={styles.colorTitleHelper}>
                Pick a color for your project 👇
              </Text>
              <FlatList
                ref={flatListRef}
                style={styles.colorList}
                contentContainerStyle={{ alignItems: 'center' }}
                horizontal
                data={COLORS}
                renderItem={({ item, index }) => (
                  <Colors
                    color={item}
                    listIndex={index}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    scrollToItemOnPress={scrollToItemOnPress}
                  />
                )}
                keyExtractor={({ id }) => id}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleSubmit}
              style={styles.button}>
              <Text style={styles.buttonText}>Create project</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default NewProject;
