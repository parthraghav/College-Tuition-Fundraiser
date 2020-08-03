import * as CloudFunctions from "firebase-functions";
import * as admin from "firebase-admin";
import * as Triggers from "./Triggers";
import * as Requests from "./Requests";
const functions = CloudFunctions.region("us-central1");

admin.initializeApp();

export const paymentOnCreate = functions.firestore
  .document("payments/{paymentId}")
  .onCreate(Triggers.Payment.onCreate);

// export const paymentOnUpdate = functions.firestore
//   .document("payments/{paymentId}")
//   .onUpdate(Triggers.Payment.onUpdate);

export const userOnWrite = functions.firestore
  .document("users/{userId}")
  .onWrite(Triggers.User.onWrite);

////////////////////////////////// REQUESTS //////////////////////////////////
export const setCurrentCollectedAmount = functions.https.onRequest(
  Requests.Audit.setCurrentCollectedAmount
);

export const copyUserCollectionToDonorList = functions.https.onRequest(
  Requests.Temp.copyUserCollectionToDonorList
);
