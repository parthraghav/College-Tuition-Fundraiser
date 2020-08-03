import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const setCurrentCollectedAmount = async (req: any, res: any) => {
  let result = "";
  try {
    const firestore = admin.firestore();
    const infoRef = firestore.collection("info");
    const donorDoc = await infoRef.doc("donorlist").get();
    if (!donorDoc.exists) {
      result = "Doc doesn't exist";
    } else {
      const donorData = donorDoc.data();
      let total = 0;
      for (let donorKey in donorData) {
        const donorEntry = donorData[donorKey];
        total += donorEntry.amount;
      }

      result = total.toString();

      const summaryRef = await infoRef.doc("collegefundcampaign");

      await summaryRef.set(
        {
          current: total,
        },
        { merge: true }
      );
    }
  } catch (e) {
    functions.logger.error(e);
  } finally {
    res.send(result);
  }
};
