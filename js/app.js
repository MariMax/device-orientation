import {initScene} from './scene.js';
import {initSensors} from './sensors.js';
import {initFirebase, FirestoreHandler} from './firebase.js';
import {addDrawQR} from './qr-generator.js';

export async function app() {
  initFirebase();
  const {model, scene, camera, renderer} = await initScene();
  const firestoreHandler = new FirestoreHandler();

  renderScene(scene, camera);

  function renderScene(scene, camera) {
    requestAnimationFrame(() => renderScene(scene, camera));
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  const modelUpdateSubscr = initSensors('', true, data => {
    model.quaternion.fromArray(data).inverse();
    firestoreHandler.pushData(data);
  });

  addDrawQR(firestoreHandler.docId);
}
