import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/'

const firebaseConfig = {
  apiKey: "AIzaSyBjTlTsXDE1GJllE8iXEpnMXZNy5x4ep_4",
  authDomain: "whats-your-fav-song.firebaseapp.com",
  projectId: "whats-your-fav-song",
  storageBucket: "whats-your-fav-song.appspot.com",
  messagingSenderId: "1074863901042",
  appId: "1:1074863901042:web:418f7e40f8e4116f8e35eb",
  measurementId: "G-T81WG1DN69"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore()