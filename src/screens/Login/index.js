//import liraries
import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Container from '../../components/Container';
import {styles} from './styles';
import Input from '../../components/input';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {NAVIGATION} from '../../constants/navigation';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../../redux/Actions/AuthAction';
import colors from '../../assets/Theme/colors';

// create a component
const Login = () => {
  const authReducer = useSelector(({auth}) => auth);
  const {loading} = authReducer;
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const {navigate} = useNavigation();
  // const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    if (Email === '' || Password === '') {
      Alert.alert('Please add all fields.');
      return;
    } else {
      try {
        let data = {
          email: Email,
          password: Password,
        };
        dispatch(loginUser(data, navigate));
      } catch (error) {
        console.log('Error ocurred', error);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator size={'large'} color={colors.primary} />
          <Text style={styles.loading}>Loading...</Text>
        </View>
      ) : (
        <Container>
          <View>
            <Text style={styles.title}>WELCOME TO CHAT APP</Text>
            <Text style={styles.subTitle}>Please login here</Text>
            <View style={styles.form}>
              <Input
                keyboardType="email-address"
                label="Email"
                iconPosition="right"
                placeholder="Enter Email"
                value={Email}
                onChangeText={value => {
                  setEmail(value);
                }}
              />

              <Input
                label="Password"
                placeholder="Enter Password"
                secureTextEntry={isSecureEntry}
                icon={
                  <TouchableOpacity
                    onPress={() => {
                      setIsSecureEntry(prev => !prev);
                    }}>
                    <Text>{isSecureEntry ? 'Show' : 'Hide'}</Text>
                  </TouchableOpacity>
                }
                iconPosition="right"
                value={Password}
                onChangeText={value => {
                  setPassword(value);
                }}
              />

              <CustomButton
                disabled={loading}
                onPress={() => {
                  onSubmit();
                }}
                loading={loading}
                primary
                title="Submit"
              />
              <View style={styles.createSection}>
                <Text style={styles.infoText}>Need new account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigate(NAVIGATION.signup);
                  }}>
                  <Text style={styles.linkBtn}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Container>
      )}
    </SafeAreaView>
  );
};

//make this component available to the app
export default Login;
