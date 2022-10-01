import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, SignUp} from '../index';
import {NAVIGATION} from '../constants/navigation';

const Stack = createNativeStackNavigator();
const AuthRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={NAVIGATION.login}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={NAVIGATION.login} component={Login} />
      <Stack.Screen name={NAVIGATION.signup} component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
