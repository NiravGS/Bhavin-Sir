import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import config from '../config'
// config
// import { firebaseConfig } from '../constants/defaultValues'

firebase.initializeApp(config.firebaseConfig)

const auth = firebase.auth()
const database = firebase.database()

export {
  auth,
  database
}
