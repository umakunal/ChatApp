//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {GiftedChat} from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/Theme/colors';
import firestore from '@react-native-firebase/firestore';

// create a component
const Chat = ({route, navigation}) => {
  const {navigate} = useNavigation();
  const user = route.params.data;
  //   console.log('route.params', route.params);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getAllMessages();
  }, []);
  const getAllMessages = async () => {
    const docID =
      user.id > 'n9g4m3PJfUZVxyCH4DBS'
        ? 'n9g4m3PJfUZVxyCH4DBS' + '-' + user.id
        : user.id + '-' + 'n9g4m3PJfUZVxyCH4DBS';
    const querySnapShot = await firestore()
      .collection('chatroom')
      .doc(docID)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();

    const allMessage = querySnapShot.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toDate(),
      };
    });
    console.log('All Messages', querySnapShot)
    setMessages(allMessage);
    // setMessages([
    //   {
    //     _id: 'n9g4m3PJfUZVxyCH4DBS',
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: user.id,
    //       name: 'React Native',
    //       avatar: `${user.firstname.substring(0, 1)}${user.lastname.substring(
    //         0,
    //         1,
    //       )}`,
    //     },
    //   },
    // ]);
  };
  const onSend = messagesArray => {
    const msg = messagesArray[0];
    const myMsg = {
      ...msg,
      sentBy: 'n9g4m3PJfUZVxyCH4DBS',
      sentTo: user.id,
      createdAt: new Date(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    const docID =
      user.id > 'n9g4m3PJfUZVxyCH4DBS'
        ? 'n9g4m3PJfUZVxyCH4DBS' + '-' + user.id
        : user.id + '-' + 'n9g4m3PJfUZVxyCH4DBS';
    firestore()
      .collection('chatroom')
      .doc(docID)
      .collection('messages')
      .add({...myMsg, createdAt: firestore.FieldValue.serverTimestamp()});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            name="chevron-back"
            size={25}
            color={colors.primary}
            style={{paddingHorizontal: 10}}
          />
        </TouchableOpacity>
        <View style={styles.innerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTxt}>{`${user.firstname.substring(
              0,
              1,
            )}${user.lastname.substring(0, 1)}`}</Text>
          </View>
          <View>
            <Text style={styles.name}>
              {user.firstname} {user.lastname}
            </Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 'n9g4m3PJfUZVxyCH4DBS',
        }}
      />
    </View>
  );
};

//make this component available to the app
export default Chat;
