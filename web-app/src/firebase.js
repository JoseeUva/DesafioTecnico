import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const firebaseConfig = {
    apiKey: "AIzaSyAKYdDHHu7qb2Qn6NGOacj0useWmrl3BQ8",
    authDomain: "the-kudos-wall.firebaseapp.com",
    projectId: "the-kudos-wall",
    storageBucket: "the-kudos-wall.firebasestorage.app",
    messagingSenderId: "856430001558",
    appId: "1:856430001558:web:723d2d65e43b0407c831b7",
    measurementId: "G-ZYM7RB10LD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dataConnect = getDataConnect(connectorConfig);

export { app, db, dataConnect };
