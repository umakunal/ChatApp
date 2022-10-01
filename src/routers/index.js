import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import {useSelector} from 'react-redux';

const MainRoute = () => {
  const authReducer = useSelector(({auth}) => auth);
  const {isLoggedIn} = authReducer;
  return (
    <NavigationContainer>
     <UserRoutes />
    </NavigationContainer>
  );
};

export default MainRoute;

// {isLoggedIn ? <UserRoutes /> : <AuthRoutes />}
