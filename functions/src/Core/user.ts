import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { isFullBatch } from "./utils";
import { defaults } from "./config";

interface User {
  email: string;
}

interface UserDocument {
  anonymous?: boolean;
  currency?: string;
  name?: string;
  totalPaidAmount?: number;
  lastPaidAmount?: number;
  lastPaidAt?: number;
  lastProcessedIp?: string;
  lastChargeId?: string;
}

export const updateUser = async (user: User, update: UserDocument) => {
  try {
    const userRef = admin.firestore().collection("users").doc(user.email);

    const userDoc = await userRef.get();

    const {
      lastPaidAmount,
      lastPaidAt,
      lastProcessedIp,
      lastChargeId,
    } = update;

    let paymentFieldBatch = {};
    const _isFullPaymentFieldBatch = isFullBatch(
      lastPaidAmount,
      lastPaidAt,
      lastProcessedIp,
      lastChargeId
    );
    if (_isFullPaymentFieldBatch) {
      paymentFieldBatch = {
        lastPaidAmount,
        lastPaidAt,
        lastProcessedIp,
        lastChargeId,
        totalPaidAmount: admin.firestore.FieldValue.increment(
          lastPaidAmount || 0
        ),
      };
    }
    if (!userDoc.exists) {
      // Document doesn't exist yet
      await userRef.set(
        {
          email: user.email,
          currency: update?.currency ?? defaults.paymentCurrency,
          anonymous: update?.anonymous ?? defaults.isUserAnonymous,
          name: update?.name ?? defaults.userName,
          ...paymentFieldBatch,
        },
        { merge: true }
      );
    } else {
      // Document already exists
      const userData = userDoc.data();

      await userRef.set(
        {
          email: user?.email ?? userData?.email,
          currency: update?.currency ?? userData?.currency,
          anonymous: update?.anonymous ?? userData?.anonymous,
          name: update?.name ?? userData?.name,
          ...paymentFieldBatch,
        },
        { merge: true }
      );
    }

    return true;
  } catch (e) {
    functions.logger.error(e);
    return false;
  }
};
