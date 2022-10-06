//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/Theme/colors';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

// create a component
const Chat = ({route, navigation}) => {
  const authReducer = useSelector(({auth}) => auth);
  const {userData} = authReducer;
  const {navigate} = useNavigation();
  const user = route.params.data;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // console.log('route.params', route.params);
    // console.log('redux userData', userData);
    // getAllMessages();
    const docID =
      user.uid > userData.userId
        ? userData.userId + '-' + user.uid
        : user.uid + '-' + userData.userId;
    const messageRef = firestore()
      .collection('chatroom')
      .doc(docID)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    messageRef.onSnapshot(querySnap => {
      const allMessages = querySnap.docs.map(docSnap => {
        const data = docSnap.data();
        if (data.createdAt) {
          return {
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docSnap.data(),
            createdAt: new Date(),
          };
        }
      });
      console.log('allMessages==>', allMessages);
      setMessages(allMessages);
    });
  }, []);
  // const getAllMessages = async () => {
  //   const docID =
  //     user.uid > userData.userId
  //       ? userData.userId + '-' + user.uid
  //       : user.uid + '-' + userData.userId;
  //   const querySnap = await firestore()
  //     .collection('chatroom')
  //     .doc(docID)
  //     .collection('messages')
  //     .orderBy('createdAt', 'desc')
  //     .get();

  //   const allMessages = querySnap.docs.map(docSnap => {
  //     return {
  //       ...docSnap.data(),
  //       createdAt: docSnap.data().createdAt.toDate(),
  //     };
  //   });
  //   console.log('allMessages==>', allMessages);
  //   setMessages(allMessages);
  // };
  const onSend = messagesArray => {
    const msg = messagesArray[0];
    console.log('messageObj', msg);
    const myMsg = {
      ...msg,
      sentBy: userData.userId,
      sentTo: user.uid,
      createdAt: new Date(),
    };
    console.log('myMsg', myMsg);
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    const docID =
      user.uid > userData.userId
        ? userData.userId + '-' + user.uid
        : user.uid + '-' + userData.userId;
    firestore()
      .collection('chatroom')
      .doc(docID)
      .collection('messages')
      .add({...myMsg, createdAt: firestore.FieldValue.serverTimestamp()});
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.primary,
          },
          left: {
            backgroundColor: colors.secondaryFade,
            color: colors.white,
          },
        }}
      />
    );
  };

  const renderInputToolbar = props => {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar
        {...props}
        textInputStyle={{
          color: colors.black,
          // backgroundColor: colors.white,
          // borderRadius: 10,
          // paddingHorizontal: 12,
          // borderWidth: 1,
          // borderColor: colors.grey,
        }}
        containerStyle={{borderTopWidth: 1, borderTopColor: colors.grey}}
      />
    );
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
        renderBubble={renderBubble}
        messages={messages}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        user={{
          _id: userData.userId,
        }}
      />
    </View>
  );
};

//make this component available to the app
export default Chat;
