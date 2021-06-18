import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './project.styles';
import Gradient from 'react-native-linear-gradient';
import ChevronRightIcon from '../ChevronRightIcon';
import { useNavigation } from '@react-navigation/native';

const Project = ({ project }) => {
  const { name, colors, icon } = project;
  const { accentColor, secondaryColor } = colors;
  const firstChar = name.charAt(0).toUpperCase();
  const router = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => router.navigate('Project', { project })}>
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Gradient
            angle={45}
            colors={[accentColor, secondaryColor]}
            style={styles.color}>
            <Text style={styles.colorText}>
              {icon !== '' ? icon : firstChar}
            </Text>
          </Gradient>
          <Text numberOfLines={2} style={styles.name}>
            {name}
          </Text>
        </View>
        <ChevronRightIcon />
      </View>
    </TouchableOpacity>
  );
};

export default Project;
