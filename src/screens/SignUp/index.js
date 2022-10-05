//import liraries
import React, {useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Container from '../../components/Container';
import {styles} from './styles';
import Input from '../../components/input';
import CustomButton from '../../components/CustomButton';
import {NAVIGATION} from '../../constants/navigation';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/Theme/colors';
import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../redux/Actions/AuthAction';

// create a component
const SignUp = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector(({auth}) => auth);
  const {loading} = authReducer;
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  // const [loading, setLoading] = useState(false);
  const {navigate} = useNavigation();
  const onSubmit = async () => {
    if (
      FirstName === '' ||
      LastName === '' ||
      Email === '' ||
      Password === ''
    ) {
      Alert.alert('Please add all fields.');
      return;
    } else {
      const data = {
        firstname: FirstName,
        lastname: LastName,
        email: Email,
        password: Password,
      };
      registerUser(dispatch, data, navigate);
      // setLoading(true);
      // try {
      //   const result = auth().createUserWithEmailAndPassword(Email, Password);

      //   await fireStore()
      //     .collection('users')
      //     .doc(result.user)
      //     .set({
      //       uid: (await result).user.uid,
      //       firsname: FirstName,
      //       lastname: LastName,
      //       email: Email,
      //       password: Password,
      //     });
      //   setLoading(false);
      //   // console.log('Firebase Auth Response', result);
      //   result.then(response => {
      //     console.log('Auth Response', response.user._user);
      //   });
      // } catch (error) {
      //   setLoading(false);
      //   console.log('Error ocurred==>', error);
      // }
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
                label="First Name"
                iconPosition="right"
                placeholder="Enter first name"
                value={FirstName}
                onChangeText={value => {
                  setFirstName(value);
                }}
              />
              <Input
                label="Last Name"
                iconPosition="right"
                placeholder="Enter last name"
                value={LastName}
                onChangeText={value => {
                  setLastName(value);
                }}
              />
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
                <Text style={styles.infoText}>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigate(NAVIGATION.login);
                  }}>
                  <Text style={styles.linkBtn}>Login</Text>
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
export default SignUp;
