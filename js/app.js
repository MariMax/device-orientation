import {startRender} from './scene.js';
import {initSensors} from './sensors.js';
import {initFirebase, FirestoreHandler} from './firebase.js';
import {addDrawQR, removeQR} from './qr-generator.js';

export async function app() {
  await initFirebase();
  const loginBtn = document.querySelector('.header');
  loginBtn.classList.remove('active');

  const firestoreHandler = new FirestoreHandler();
  await addDrawQR(firestoreHandler.docId);
  await firestoreHandler.whenQRScanned;
  removeQR();

  const model = await startRender();

  initSensors('', true, data => {
    model.quaternion.fromArray(data).inverse();
    firestoreHandler.pushData(data);
  });
}
