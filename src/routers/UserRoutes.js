import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Chat, Home, Profile} from '../index';
import {NAVIGATION} from '../constants/navigation';

const Stack = createNativeStackNavigator();
const UserRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={NAVIGATION.home}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={NAVIGATION.home} component={Home} />
      <Stack.Screen name={NAVIGATION.chat} component={Chat} />
      <Stack.Screen name={NAVIGATION.profile} component={Profile} />
    </Stack.Navigator>
  );
};

export default UserRoutes;
