import { useMutation } from '@apollo/client';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  useWindowDimensions,
  Vibration,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import COLORS from '../../components/COLORS';
import { EDIT_PROJECT } from '../../GraphQL/mutations';
import { GET_PROJECTS } from '../../GraphQL/querys';
import styles from './editproject.styles';
import ErrorIcon from '../../components/ErrorIcon';
import Colors from '../../components/Colors/Colors';
import { useNavigation } from '@react-navigation/native';

const MAX_NAME_LENGTH = 18;
const MAX_ICON_LENGTH = 1;

const EditProject = ({ isVisible, setIsVisible, project }) => {
  const { id, name, colors, icon } = project;
  const { id: colorId, accentColor, secondaryColor } = colors;

  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(false);

  const [projectNameAndIcon, setProjectNameAndIcon] = useState({
    name,
    icon,
  });

  const [selectedColor, setSelectedColor] = useState(colorId);

  const router = useNavigation();

  let width = useWindowDimensions().width;
  let height = useWindowDimensions().height;

  const nameInputRef = useRef();
  const iconInputRef = useRef();
  const flatListRef = useRef();

  const [editProject] = useMutation(EDIT_PROJECT, {
    update(cache, { data: { editProject } }) {
      const { getProjects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { getProjects: getProjects.concat([editProject]) },
      });
    },
  });

  function scrollToItem(item) {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: '' + item,
      viewPosition: 0.5,
    });
  }

  async function handleSubmit() {
    const { name, icon } = projectNameAndIcon;
    if (name === '') {
      setError(true);
      return;
    }

    const input = {
      id,
      name: name.trim(),
      icon,
      colors: selectedColor,
    };

    try {
      await editProject({
        variables: {
          input,
        },
      });
      setIsVisible(false);
      router.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(text, target) {
    setError(false);
    setProjectNameAndIcon({
      ...projectNameAndIcon,
      [target]: text,
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
      <TouchableWithoutFeedback
        onPress={() => {
          nameInputRef.current.blur();
          iconInputRef.current.blur();
        }}>
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
                  ref={nameInputRef}
                  value={projectNameAndIcon.name}
                  maxLength={MAX_NAME_LENGTH}
                  onChangeText={text => handleChange(text, 'name')}
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
              {projectNameAndIcon.name.length}/{MAX_NAME_LENGTH}
            </Text>
            <View>
              <Text style={styles.label}>Icon</Text>
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
                  ref={iconInputRef}
                  value={projectNameAndIcon.icon}
                  maxLength={MAX_ICON_LENGTH}
                  onChangeText={text => handleChange(text, 'icon')}
                  style={styles.textInput}
                  placeholderTextColor="rgba(0,0,0,0.6)"
                  placeholder="📚"></TextInput>
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
                    scrollToItem={scrollToItem}
                    activeColor={colorId}
                  />
                )}
                keyExtractor={({ id }) => id}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleSubmit}
              style={styles.button}>
              <Text style={styles.buttonText}>Update project</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditProject;
