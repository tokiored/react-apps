// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDdMqPkaEWmXJVTSUXqTgqaW4KhVR1WKI4',
    authDomain: 'react-tokiotask-app.firebaseapp.com',
    projectId: 'react-tokiotask-app',
    storageBucket: 'react-tokiotask-app.firebasestorage.app',
    messagingSenderId: '334607496302',
    appId: '1:334607496302:web:23bb31a276a093d9b7a27f',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app)

export { app, db, auth, storage }
