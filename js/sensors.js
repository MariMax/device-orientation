export function initSensors(model, coordinateSystem, isRelative) {
  if (navigator.permissions) {
    // https://w3c.github.io/orientation-sensor/#model
    Promise.all([
      navigator.permissions.query({name: 'accelerometer'}),
      navigator.permissions.query({name: 'magnetometer'}),
      navigator.permissions.query({name: 'gyroscope'}),
    ])
      .then(results => {
        if (results.every(result => result.state === 'granted')) {
          initSensor(model, coordinateSystem, isRelative);
        } else {
          console.log('Permission to use sensor was denied.');
        }
      })
      .catch(err => {
        console.log(
          'Integration with Permissions API is not enabled, still try to start app.',
        );
        initSensor(model, coordinateSystem, isRelative);
      });
  } else {
    console.log('No Permissions API, still try to start app.');
    initSensor(model, coordinateSystem, isRelative);
  }
}

function initSensor(model, coordinateSystem, isRelative) {
  const options = {frequency: 60, coordinateSystem};
  // console.log(JSON.stringify(options));
  const sensor = isRelative
    ? new RelativeOrientationSensor(options)
    : new AbsoluteOrientationSensor(options);
  sensor.onreading = () =>
    model.quaternion.fromArray(sensor.quaternion).inverse();
  sensor.onerror = event => {
    if (event.error.name == 'NotReadableError') {
      console.log('Sensor is not available.');
    }
  };
  sensor.start();
}
