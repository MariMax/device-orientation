import {startRender} from './scene.js';
import {initSensors} from './sensors.js';
import {initFirebase, FirebaseHandler} from './firebase.js';
import {addDrawQR, removeQR} from './qr-generator.js';

export async function app() {
  await initFirebase();
  const loginBtn = document.querySelector('.header');
  loginBtn.classList.remove('active');

  const firebaseHandler = new FirebaseHandler();
  console.log(firebaseHandler.docId);
  await addDrawQR(firebaseHandler.docId);
  await firebaseHandler.whenQRScanned;
  removeQR();

  const model = await startRender();

  // 'device' https://developer.mozilla.org/en-US/docs/Web/API/AbsoluteOrientationSensor/AbsoluteOrientationSensor#Parameters
  initSensors('screen', true, data => {
    model.quaternion.fromArray(data);//.inverse();
    firebaseHandler.pushData(data);
  });
}
