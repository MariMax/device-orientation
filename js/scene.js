export async function initScene() {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    200,
  );
  camera.position.z = 10;

  const scene = new THREE.Scene();

  var ambientLight = new THREE.AmbientLight(0x404040, 6);
  scene.add(ambientLight);

  var manager = new THREE.LoadingManager();
  var mtlLoader = new THREE.MTLLoader(manager);
  const model = await new Promise(resolve => {
    mtlLoader.setTexturePath('resources/');
    mtlLoader.load('resources/phone.mtl', materials => {
      materials.preload();
      var objLoader = new THREE.OBJLoader(manager);
      objLoader.setMaterials(materials);
      objLoader.load('resources/phone.obj', object => {
        const model = object;
        scene.add(model);
        resolve(model);
      });
    });
  });

  const renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener(
    'resize',
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false,
  );

  document.addEventListener('mousedown', () => {
    // document.documentElement.requestFullscreen(),
  });
  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement != null) {
      screen.orientation.lock('natural');
    }
  });
  return {camera, model, scene, renderer};
}
