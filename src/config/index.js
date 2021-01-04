const staging = {
  // baseUrlApi: 'https://api.dataplatform-wavicledata.com/staging',
  baseUrlApi: 'http://3.135.193.232/api/staging',
  firebaseConfig: {
    apiKey: 'AIzaSyAsrhmPWMiX8TPMmqkXVaNFSNHrCNMQdCE',
    authDomain: 'staging-dataplatform.firebaseapp.com',
    databaseURL: 'https://staging-dataplatform.firebaseio.com',
    projectId: 'staging-dataplatform',
    storageBucket: 'staging-dataplatform.appspot.com',
    messagingSenderId: '953366225159',
    appId: '1:953366225159:web:222b2a11e2581f283065a2'
  }
}

const development = {
  baseUrlApi: 'http://localhost:4000',
  firebaseConfig: staging.firebaseConfig
}

const production = {
  // baseUrlApi: 'https://api.dataplatform-wavicledata.com',
  baseUrlApi: 'http://3.135.193.232/api',
  firebaseConfig: {
    apiKey: 'AIzaSyAyKkNiCent8AegHZT1SEYXZGczREh1S2s',
    authDomain: 'dataplatform-wavicledata.firebaseapp.com',
    databaseURL: 'https://dataplatform-wavicledata.firebaseio.com',
    projectId: 'dataplatform-wavicledata',
    storageBucket: 'dataplatform-wavicledata.appspot.com',
    messagingSenderId: '262277301822',
    appId: '1:262277301822:web:7ca97499ab28a7f304736f'
  }
}

const config = {
  development,
  production,
  staging
}

export default config[process.env.REACT_APP_HOST_ENV || 'development']
