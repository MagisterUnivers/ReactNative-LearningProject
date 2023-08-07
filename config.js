import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// Colaboration project-config with 2 members
const firebaseConfig = {
	apiKey: 'AIzaSyC_16jIDL-iDcr5hHsWWHJ08WAepmmwe3Q',
	authDomain: 'bc48-react-native-hw.firebaseapp.com',
	databaseURL:
		'https://bc48-react-native-hw-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'bc48-react-native-hw',
	storageBucket: 'bc48-react-native-hw.appspot.com',
	messagingSenderId: '1006241874438',
	appId: '1:1006241874438:web:453fcd70fcdbb859baf987'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
