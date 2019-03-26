var config = {
  apiKey: 'AIzaSyClFwU1pu2A4YVWSllCx3PP1CMS98z3wKU',
  authDomain: 'web-ar-e1c34.firebaseapp.com',
  databaseURL: 'https://web-ar-e1c34.firebaseio.com',
  projectId: 'web-ar-e1c34',
};
firebase.initializeApp(config);

export async function initFirebase() {
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const loginBtn = document.querySelector('.login');
  loginBtn.addEventListener('click', async () => {
    const result = await auth.signInWithPopup(provider);
    // const token = result.credential.accessToken;
    // const user = result.user;
    // console.log(result);
  });

  return new Promise(resolve => {
    if (!auth.currentUser) {
      auth.onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        }
      });
    } else {
      resolve(true);
    }
  });
}
export class FirebaseHandler {
  constructor() {
    this.readyState = new Promise(resolve => {
      this.readyStateTrigger = resolve;
    });
    this.firebase = firebase.database().ref(`pointers`);
    const userId = firebase.auth().currentUser.uid;
    this.docRef = this.firebase.child(userId);
    this.docRef.set({
      ready: false,
    });
    this.docRef.on('value', snapshot => {
      if (snapshot.val() && snapshot.val().ready === true) {
        this.readyStateTrigger();
        this.docRef.off();
      }
    });
  }

  get docId() {
    return this.docRef.key;
  }

  get whenQRScanned() {
    return this.readyState;
  }

  pushData(data) {
    this.docRef.update({
      direction: data,
    });
  }
}
