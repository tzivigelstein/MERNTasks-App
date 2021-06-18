import 'react-native-gesture-handler';
import React from 'react';
import Login from './views/Login/Login';
import Signup from './views/Signup/Signup';
import Home from './views/Home/Home';
import Project from './views/Project/Project';
import ProjectSettings from './views/ProjectSettings/ProjectSettings';

import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            options={{
              title: 'Login',
              headerShown: false,
            }}
            component={Login}
          />

          <Stack.Screen
            name="Signup"
            options={{
              title: 'Signup',
              headerStyle: {
                backgroundColor: '#fff',
                shadowColor: 'rgba(0,0,0,0)',
              },
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            component={Signup}
          />

          <Stack.Screen
            name="Home"
            options={{
              title: 'Home',
              headerShown: false,
            }}
            component={Home}
          />

          <Stack.Screen
            name="Project"
            options={{
              title: 'Project',
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            component={Project}
          />

          <Stack.Screen
            name="ProjectSettings"
            options={{
              title: 'ProjectSettings',
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            component={ProjectSettings}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
