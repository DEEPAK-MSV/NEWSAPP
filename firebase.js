// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1us5E4kQI8PRLF9Gpbg9pn6G3TbkWfHo",
  authDomain: "newsapp-fffda.firebaseapp.com",
  projectId: "newsapp-fffda",
  storageBucket: "newsapp-fffda.appspot.com",
  messagingSenderId: "923876044707",
  appId: "1:923876044707:web:d3f8e2e4681e2f66fc3416"
};

// Initialize Firebase

let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

const auth = firebase.auth();

export { auth, firebase as default };

