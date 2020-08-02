import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import md5 = require("md5");

export const copyUserCollectionToDonorList = async (req: any, res: any) => {
  try {
    const firestore = admin.firestore();
    const infoRef = firestore.collection("info").doc("donorlist");
    const usersSnapshot = await firestore
      .collection("users")
      .orderBy("totalPaidAmount", "desc")
      .get();
    for (const userSnap of usersSnapshot.docs) {
      const data = userSnap.data();
      const id = md5(userSnap.id);
      await infoRef.set(
        {
          [id]: {
            name: data?.name ?? "",
            anonymous: data?.anonymous ?? true,
            source: data?.source || null,
            amount: data?.totalPaidAmount || 0,
          },
        },
        { merge: true }
      );
    }
  } catch (e) {
    functions.logger.error(e);
  } finally {
    res.send("fuck you");
  }
};
