import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import ChevronLeftIcon from '../../components/ChevronLeftIcon';
import styles from './projectsettings.styles';
import Gradient from 'react-native-linear-gradient';
import BinIcon from '../../components/BinIcon';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { DELETE_PROJECT } from '../../GraphQL/mutations';
import { GET_PROJECTS } from '../../GraphQL/querys';
import EditProject from '../EditProject/EditProject';

const ProjectSettings = ({ route, navigation }) => {
  const { project } = route.params;
  const { id, name, parsedDate, parsedTime, colors, icon } = project;
  const { id: colorId, name: colorName, accentColor, secondaryColor } = colors;
  const firstChar = name.charAt(0).toUpperCase();

  const [isVisible, setIsVisible] = useState(false);

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    update(cache, { data: { deleteProject } }) {
      const { getProjects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { getProjects: getProjects.concat([deleteProject]) },
      });
    },
  });

  const [editProject] = useMutation(DELETE_PROJECT, {
    update(cache, { data: { editProject } }) {
      const { getProjects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { getProjects: getProjects.concat([editProject]) },
      });
    },
  });

  const router = useNavigation();

  function handleDeletePress() {
    Alert.alert(`Delete ${name}`, `Are you sure you want to delete ${name}?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel'),
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => handleDelete() },
    ]);
  }

  async function handleDelete() {
    try {
      await deleteProject({
        variables: {
          input: {
            id,
          },
        },
      });
      router.navigate('Home');
    } catch (error) {
      console.log('error', error);
    }
  }

  async function handleEditProject() {
    setIsVisible(true);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.heading}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}>
            <ChevronLeftIcon
              width={32}
              height={32}
              style={{ marginRight: 16 }}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.optionsContainer}>
          <View>
            <TouchableOpacity onPress={handleEditProject} activeOpacity={0.6}>
              <View style={styles.option}>
                <View>
                  <Text style={styles.optionTitle}>Project name</Text>
                  <Text style={styles.optionValue}>{name}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEditProject} activeOpacity={0.6}>
              <View style={styles.option}>
                <View>
                  <Text style={styles.optionTitle}>Project accent color</Text>
                  <Text style={styles.optionValue}>{colorName}</Text>
                </View>
                <Gradient
                  angle={45}
                  style={styles.color}
                  colors={[accentColor, secondaryColor]}></Gradient>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEditProject} activeOpacity={0.6}>
              <View style={styles.option}>
                <View>
                  <Text style={styles.optionTitle}>Project icon</Text>
                  <Text style={styles.optionValue}>
                    {icon !== '' ? icon : firstChar}
                  </Text>
                </View>
                <Gradient
                  angle={45}
                  style={styles.color}
                  colors={[accentColor, secondaryColor]}>
                  <Text style={styles.icon}>
                    {icon !== '' ? icon : firstChar}
                  </Text>
                </Gradient>
              </View>
            </TouchableOpacity>
            <View style={styles.option}>
              <View>
                <Text style={styles.optionTitle}>Created</Text>
                <Text style={styles.optionValue}>
                  {parsedDate} at {parsedTime}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleDeletePress}
            style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>
              Delete <Text style={styles.deleteProjectName}>{name}</Text>
            </Text>
            <BinIcon
              stroke={'#fff'}
              width={18}
              height={18}
              style={{ marginLeft: 16 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <EditProject
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        project={project}
      />
    </>
  );
};

export default ProjectSettings;
