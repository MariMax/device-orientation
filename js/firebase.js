var config = {
  apiKey: 'AIzaSyClFwU1pu2A4YVWSllCx3PP1CMS98z3wKU',
  authDomain: 'web-ar-e1c34.firebaseapp.com',
  databaseURL: 'https://web-ar-e1c34.firebaseio.com',
  projectId: 'web-ar-e1c34',
  storageBucket: 'web-ar-e1c34.appspot.com',
  messagingSenderId: '323483923467',
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
    console.log(result);
  });
}
