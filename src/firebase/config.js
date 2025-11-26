// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBRqAfTb5bG5znqtC1mhvP_DwKsAOrhhSc',
    authDomain: 'react-finance-app-cc137.firebaseapp.com',
    projectId: 'react-finance-app-cc137',
    storageBucket: 'react-finance-app-cc137.firebasestorage.app',
    messagingSenderId: '207145561768',
    appId: '1:207145561768:web:cdb20b78b4b78ce9509c9d',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
