import React, { useState } from 'react';
import styles from './project.styles';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import ChevronLeftIcon from '../../components/ChevronLeftIcon';
import SettingsIcon from '../../components/SettingsIcon';
import NewTask from '../NewTask/NewTask';
import { useNavigation } from '@react-navigation/native';
import Gradient from 'react-native-linear-gradient';
import NewIcon from '../../components/NewIcon';
import Task from '../../components/Task/Task';
import useTime from '../../hooks/useTime';
import RNLocalize from 'react-native-localize';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../../GraphQL/querys';

const dueTo = new Date(Date.now()).toLocaleTimeString([], {
  timeZone: 'America/Buenos_Aires',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
});

const MOCK = [
  {
    __typename: 'Tasks',
    id: '60954de9ccf440001731abc8',
    name: 'Fix flashing screen when changing project',
    state: false,
  },
  {
    __typename: 'Tasks',
    id: '6043fc3491ff0600175d94a5',
    name: 'Add settings',
    state: false,
  },
  {
    __typename: 'Tasks',
    id: '6043fc3b91ff0600175d94a6',
    name: 'Add color personalization',
    state: false,
  },
];

const Project = ({ route, navigation }) => {
  const { project } = route.params;
  const { id, name, parsedDate, parsedTime, colors } = project;
  const { accentColor, secondaryColor } = colors;

  const [mock, setMock] = useState(MOCK);
  const [isVisible, setIsVisible] = useState(false);

  const router = useNavigation();
  /* useTime(RNLocalize.getTimeZone()); */
  const time = '11:22';

  const { loading, error, data, refetch } = useQuery(GET_TASKS, {
    variables: {
      input: {
        id,
      },
    },
  });

  let tasks = data ? data.getTasks : [];

  function handleDelete(id) {
    Vibration.vibrate(50);
    setMock(mock.filter(task => task.id !== id));
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.heading}>
          <View style={styles.titleAndBackButton}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.goBack()}>
              <ChevronLeftIcon
                width={32}
                height={32}
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{name}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => router.navigate('ProjectSettings', { project })}>
            <SettingsIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.subHeading}>
          <Text
            style={[
              styles.time,
              time !== ''
                ? { backgroundColor: secondaryColor, color: '#fff' }
                : {},
            ]}>
            {time !== '' ? (
              time
            ) : (
              <ActivityIndicator size="small" color={secondaryColor} />
            )}
          </Text>
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            activeOpacity={0.6}>
            <Gradient
              style={styles.newTaskButton}
              angle={45}
              colors={[accentColor, secondaryColor]}>
              <NewIcon stroke="#fff" strokeWidth={3} width={21} height={21} />
              <Text style={styles.newTaskButtonText}>New</Text>
            </Gradient>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.tasksList}
          data={mock}
          onRefresh={refetch}
          refreshing={loading}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Task handleDelete={handleDelete} task={item} colors={colors} />
          )}
        />
      </View>
      <NewTask isVisible={isVisible} setIsVisible={setIsVisible} />
    </>
  );
};

export default Project;
