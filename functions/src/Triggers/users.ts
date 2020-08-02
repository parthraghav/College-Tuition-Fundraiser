import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import md5 = require("md5");

export const onWrite = async (
  snapshot: functions.Change<functions.firestore.DocumentSnapshot>,
  context: functions.EventContext
) => {
  try {
    const isDeleted = !snapshot.after.exists;
    const isCreated = !snapshot.before.exists;
    const afterData = isDeleted ? null : snapshot.after.data();
    const isUpdated =
      !isDeleted && !isCreated && snapshot.before.data() !== afterData;

    const docId = md5(context.params.userId);

    const infoRef = admin.firestore().collection("info").doc("donorlist");

    if (isDeleted) {
      await infoRef.set(
        {
          [docId]: admin.firestore.FieldValue.delete(),
        },
        { merge: true }
      );
    }

    if (isCreated || isUpdated) {
      await infoRef.set(
        {
          [docId]: {
            name: afterData?.name ?? "",
            anonymous: afterData?.anonymous ?? true,
            source: afterData?.source || null,
            amount: afterData?.totalPaidAmount || 0,
          },
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
