import app from "firebase/app";
import "firebase/analytics";
import "firebase/firestore"; // <- needed if using firestore
import { FIREBASE_CONFIG } from "./Config";

class Firebase {
  db: app.firestore.Firestore;
  analytics: app.analytics.Analytics;
  constructor() {
    app.initializeApp(FIREBASE_CONFIG);
    this.db = app.firestore(); // <- needed if using firestore
    this.analytics = app.analytics();
  }
}

const FirebaseApp = new Firebase();

export { FirebaseApp, Firebase };
