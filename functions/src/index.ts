import * as CloudFunctions from "firebase-functions";
import * as admin from "firebase-admin";
import Triggers from "./Triggers";
const functions = CloudFunctions.region("us-central1");

admin.initializeApp();

export const paymentOnCreate = functions.firestore
  .document("payments/{paymentId}")
  .onCreate(Triggers.Payment.onCreate);

// export const paymentOnUpdate = functions.firestore
//   .document("payments/{paymentId}")
//   .onUpdate(Triggers.Payment.onUpdate);
