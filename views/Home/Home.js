import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './home.styles';
import { useNavigation } from '@react-navigation/native';
import Heading from '../../components/Heading/Heading';
import NewProjectButton from '../../components/NewProjectButton/NewProjectButton';
import Project from '../../components/Project/Project';
import NewProject from '../NewProject/NewProject';
import NewIcon from '../../components/NewIcon';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../../GraphQL/querys';
import RNLocalize from 'react-native-localize';
import useConnection from '../../hooks/useConnection';
import Disconnected from '../../components/ConnectionStatusIndicator/ConnectionStatusIndicator';

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useNavigation();
  const timeZone = RNLocalize.getTimeZone();
  const [isConnected] = useConnection();

  const { loading, error, data, refetch } = useQuery(GET_PROJECTS);
  const projects = data?.getProjects;

  useEffect(() => {
    router.addListener('beforeRemove', e => {
      e.preventDefault();
      return;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parsedDateAndTimeProjects =
    !loading && projects !== undefined
      ? projects.map(project => {
          const { date } = project;
          const intDate = parseInt(date);
          const objectDate = new Date(intDate);

          const parsedDate = objectDate.toLocaleDateString([], {
            timeZone,
          });

          const parsedTime = objectDate.toLocaleTimeString([], {
            timeZone,
            hour: 'numeric',
            minute: 'numeric',
          });

          return {
            ...project,
            parsedDate,
            parsedTime,
          };
        })
      : [];

  return (
    <>
      <StatusBar
        backgroundColor={isModalVisible ? 'rgba(0,0,0,0.5)' : '#fff'}
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <Heading
          title="Projects"
          componentRight={
            <NewProjectButton
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
            />
          }
        />
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#2f3848" />
          </View>
        ) : (
          <FlatList
            data={parsedDateAndTimeProjects}
            renderItem={({ item }) => <Project project={item} />}
            keyExtractor={({ id }) => id}
            onRefresh={() => refetch()}
            refreshing={loading}
            style={{ flex: 1 }}
          />
        )}
      </View>
      <NewProject isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
    </>
  );
};

export default Home;
