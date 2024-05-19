import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ3M9Kp016MSdTEm8bKAoOGfudabq1ICY",
  authDomain: "automatizacion-e8a37.firebaseapp.com",
  projectId: "automatizacion-e8a37",
  storageBucket: "automatizacion-e8a37.appspot.com",
  messagingSenderId: "534996539332",
  appId: "1:534996539332:web:7508d5fa0b703657da7691"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
