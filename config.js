import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDQUniPbCuDr3O9sMgs-I8urVZHLgg0FNI",
  authDomain: "carpooling-aac8b.firebaseapp.com",
  projectId: "carpooling-aac8b",
  storageBucket: "carpooling-aac8b.appspot.com",
  messagingSenderId: "649031574916",
  appId: "1:649031574916:web:04c44d511ebc4bc2cda9d1"
};
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig)
}
export default firebase.firestore();