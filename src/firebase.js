import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDBuvuBI37GZnqp9kpK24ZHDfWrMAJhQnY",
    authDomain: "i-message-clone-c739c.firebaseapp.com",
    projectId: "i-message-clone-c739c",
    storageBucket: "i-message-clone-c739c.appspot.com",
    messagingSenderId: "748785487661",
    appId: "1:748785487661:web:c738eda9e3333be5788da4",
    measurementId: "G-0NK867HY28"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
