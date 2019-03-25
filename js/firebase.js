var config = {
  apiKey: 'AIzaSyClFwU1pu2A4YVWSllCx3PP1CMS98z3wKU',
  authDomain: 'web-ar-e1c34.firebaseapp.com',
  projectId: 'web-ar-e1c34',
};
firebase.initializeApp(config);

export function initFirebase() {
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  const loginBtn = document.querySelector('.login');

  loginBtn.addEventListener('click', async () => {
    const result = await auth.signInWithPopup(provider);
    // const token = result.credential.accessToken;
    // const user = result.user;
    // console.log(result);
  });
}

export class FirestoreHandler {
  constructor() {
    this.firestore = firebase.firestore();
    this.docRef = this.firestore.collection('pointers').doc();
  }

  get docId() {
    return this.docRef.id;
  }

  pushData(data) {
    this.docRef.set({
      direction: data,
    }, {merge: true});
  }
}
