import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyChO6tdZn6pxzBUC5vvip6EFWx2aNBeXPw',
    authDomain: 'react-recipe-app-8f5fa.firebaseapp.com',
    projectId: 'react-recipe-app-8f5fa',
    storageBucket: 'react-recipe-app-8f5fa.firebasestorage.app',
    messagingSenderId: '284307406962',
    appId: '1:284307406962:web:671c3c77bf348b634802eb',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
