const subscriptions = [];
let initialized = false;

export function initSensors(coordinateSystem, isRelative, fn) {
  if (initSensors) {
    subscriptions.push(fn);
    return {
      unsubscribe: () => (subscriptions = subscriptions.filter(i => i !== fn)),
    };  
  }
  if (navigator.permissions) {
    // https://w3c.github.io/orientation-sensor/#model
    Promise.all([
      navigator.permissions.query({name: 'accelerometer'}),
      navigator.permissions.query({name: 'magnetometer'}),
      navigator.permissions.query({name: 'gyroscope'}),
    ])
      .then(results => {
        if (results.every(result => result.state === 'granted')) {
          initSensor(coordinateSystem, isRelative);
        } else {
          console.log('Permission to use sensor was denied.');
        }
      })
      .catch(err => {
        console.log(
          'Integration with Permissions API is not enabled, still try to start app.',
        );
        initSensor(coordinateSystem, isRelative);
      });
  } else {
    console.log('No Permissions API, still try to start app.');
    initSensor(coordinateSystem, isRelative);
  }
  initialized = true;
  subscriptions.push(fn);
  return {
    unsubscribe: () => (subscriptions = subscriptions.filter(i => i !== fn)),
  };
}

function initSensor(coordinateSystem, isRelative) {
  const options = {frequency: 60, coordinateSystem};
  // console.log(JSON.stringify(options));
  const sensor = isRelative
    ? new RelativeOrientationSensor(options)
    : new AbsoluteOrientationSensor(options);
  sensor.onreading = () => {
    // const values = sensor.quaternion;
    // model.quaternion.fromArray(values).inverse();
    subscriptions.forEach(i => {
      i(sensor.quaternion);
    });
  };
  sensor.onerror = event => {
    if (event.error.name == 'NotReadableError') {
      console.log('Sensor is not available.');
    }
  };
  sensor.start();
}
