import app from "firebase/app";
import "firebase/firestore"; // <- needed if using firestore
import { FIREBASE_CONFIG } from "./Config";

class Firebase {
  db: app.firestore.Firestore;
  constructor() {
    app.initializeApp(FIREBASE_CONFIG);
    this.db = app.firestore(); // <- needed if using firestore
  }
}

const FirebaseApp = new Firebase();

export { FirebaseApp, Firebase };
