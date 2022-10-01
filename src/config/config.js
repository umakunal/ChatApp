import {initializeApp} from '@react-native-firebase/app';
import {firebase} from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCSAoifC7EcjJXOxzp_iaOd54x_1zPjRJ0',
  authDomain: 'chatapp-fbc11.firebaseapp.com',
  projectId: 'chatapp-fbc11',
  storageBucket: 'chatapp-fbc11.appspot.com',
  messagingSenderId: '516079849078',
  appId: '1:516079849078:web:aafb067525801affe45957',
};

const app = initializeApp(firebaseConfig);
export const db = firebase.firestore(app);
