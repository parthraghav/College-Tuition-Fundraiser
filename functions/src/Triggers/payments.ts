import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { StripeManager, UserManager } from "../Core";

export const onCreate = async (
  snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext
) => {
  try {
    const paymentData = snapshot.data();
    const paymentId = snapshot.id;
    const { amount, currency, token, name } = paymentData;
    const paymentsRef = await admin
      .firestore()
      .collection("payments")
      .doc(paymentId);

    // Make sure the currency is US Dollars
    if (currency !== "USD") return;

    // Make sure the payment exists or it hasn't been charged already
    if (!paymentData || paymentData.charge) return;

    await paymentsRef.set(
      { status: "PENDING_STRIPE_CONFIRMATION" },
      { merge: true }
    );

    const source = token.id;

    const idempotencyToken = token.id;

    const charge = { amount, currency, source };

    const chargeResponse = await StripeManager.createCharge(
      charge,
      idempotencyToken
    );

    // Update charge object in the document in the payments collection
    await paymentsRef.set(
      { charge: chargeResponse, status: "SUCCESSFUL_STRIPE_CONFIRMATION" },
      { merge: true }
    );

    if (chargeResponse.paid) {
      // transaction was successful, make/update a document in the `Users` collection
      await UserManager.updateUser(
        { email: paymentData.email },
        {
          lastPaidAmount:
            chargeResponse.amount - chargeResponse.amount_refunded,
          lastPaidAt: chargeResponse.created,
          lastProcessedIp: token.client_ip,
          lastChargeId: chargeResponse.id,
          name: name,
          anonymous: name === "",
        }
      );
    } else {
      functions.logger.error("Transaction wasn't successful");
    }

    return true;
  } catch (e) {
    functions.logger.error(e);
    return false;
  }
};
