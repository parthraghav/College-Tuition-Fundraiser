import app from "firebase/app";
import { FIREBASE_CONFIG } from "./Config";

class Firebase {
  constructor() {
    app.initializeApp(FIREBASE_CONFIG);
  }
}

export default Firebase;
