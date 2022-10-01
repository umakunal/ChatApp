import React from 'react';
import {StatusBar, View} from 'react-native';
import colors from './src/assets/Theme/colors';
import MainRoute from './src/routers';
import { Provider } from 'react-redux';
import store from './src/redux/Store/store';
const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <MainRoute />
    </Provider>
  );
};

export default App;
