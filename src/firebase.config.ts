import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBCoPVeOwc_usFZCpih1tzEnEMJDCGkQ_w",
    authDomain: "firstionicapp-3d078.firebaseapp.com",
    databaseURL: "https://firstionicapp-3d078-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "firstionicapp-3d078",
    storageBucket: "firstionicapp-3d078.appspot.com",
    messagingSenderId: "1013549152019",
    appId: "1:1013549152019:web:6109572dd75cee5a4c0ce6"
  };
firebase.initializeApp(firebaseConfig);


export async function loginFirebase(email :string, password :string) { 
    return await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(data => {        
        return {result: true, data: data.user}
    })
    .catch(err => {
        return {result: false, data:err.message}
    })
}


export async function registerFirebase(email :string, password :string) {
    return await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(data => {
        return {result: true, data: data}
    })
    .catch(err => {        
        return {result: false, data:err.message}
    })
}

export function findData(uid: string) {
    const firebaseData = firebase.database().ref('Users/' + uid)
    return firebaseData
}

export function createData (uid :string, data :object) :void  {
    const firebaseData = firebase.database().ref('Users/' + uid)
    firebaseData.push(data)
}

export function updatePhotoFB(uid :string, key :string, base64Photo :string) {
    const firebaseData :any = firebase.database().ref(`Users/${uid}/${key}`)
    firebaseData.update({
        photo: base64Photo
    })
}

export function updateDataFB(uid :string, key :string, data :object) {
    const firebaseData :any = firebase.database().ref(`Users/${uid}/${key}`)
    firebaseData.update(data)
}