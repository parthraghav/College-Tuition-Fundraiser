import * as CloudFunctions from "firebase-functions";

// const stripe = require("stripe")(CloudFunctions.config().stripe.testkey);
const stripe = require("stripe")(CloudFunctions.config().stripe.livekey);

interface Charge {
  amount: number;
  currency: string;
  source: string;
}

// Returns a stripe charge object that stripe sends
export const createCharge = async (
  charge: Charge,
  idempotencyToken: string
) => {
  return await stripe.charges.create(charge, {
    idempotency_key: idempotencyToken,
  });
};
