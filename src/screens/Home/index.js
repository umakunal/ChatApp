//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Container from '../../components/Container';
import colors from '../../assets/Theme/colors';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {NAVIGATION} from '../../constants/navigation';
// create a component
const Home = () => {
  const {navigate} = useNavigation();
  const [AllUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    getDatabase();
  }, []);
  const getDatabase = async () => {
    try {
      setLoading(true);
      const usersCollection = await firestore().collection('users').get();
      const allUsers = [];
      usersCollection.docs.forEach(data => {
        let userData = data._data;
        // console.log('All userData', userData);
        allUsers.push({
          id: data.id,
          firstname: userData.firsname,
          lastname: userData.lastname,
          email: userData.email,
        });
      });
      let filteredArray = allUsers.filter(
        item => item.id !== 'n9g4m3PJfUZVxyCH4DBS',
      );
      // console.log('usersCollection', usersCollection);
      console.log('allUsers', allUsers);
      console.log('filteredArray', filteredArray);
      setAllUser(filteredArray);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
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
          <FlatList
            nestedScrollEnabled={true}
            data={AllUser}
            key={(item, index) => item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.userRow}
                onPress={() => {
                  navigate(NAVIGATION.chat, {data: item});
                }}>
                <View style={styles.innerRow}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarTxt}>{`${item.firstname.substring(
                      0,
                      1,
                    )}${item.lastname.substring(0, 1)}`}</Text>
                  </View>
                  <View>
                    <Text style={styles.name}>
                      {item.firstname} {item.lastname}
                    </Text>
                    <Text style={styles.email}>{item.email}</Text>
                  </View>
                </View>
                <Text style={styles.time}>8:27 PM</Text>
              </TouchableOpacity>
            )}
          />
        </Container>
      )}
    </SafeAreaView>
  );
};

//make this component available to the app
export default Home;
