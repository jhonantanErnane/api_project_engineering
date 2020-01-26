import * as admin from 'firebase-admin';
import * as config from './config';

const _FB = admin.initializeApp({
  credential: admin.credential.cert(config.serviceJson as any),
  databaseURL: "https://testeengineering-52f11.firebaseio.com"
});

export default {
  admin: admin.auth(),
  messaging: admin.messaging(),
  firestore: admin.firestore(),
  database:  admin.database()
};