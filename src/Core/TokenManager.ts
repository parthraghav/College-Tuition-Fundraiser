import { FirebaseApp } from "./Firebase";

export const tokenHandler = (token: any, amount: number) => {
  const transactedAmount = amount * 100;
  const { id, email } = token;
  console.log(token);
  processPayment(token, id, email, transactedAmount);
};

export const processPayment = async (
  token: any,
  id: string,
  email: string,
  transactedAmount: number
) => {
  const paymentsRef = FirebaseApp.db.collection("payments");
  const _docId = id.slice(4, id.length);
  await paymentsRef.doc(_docId).set({
    id: id,
    email: email,
    token: token,
    amount: transactedAmount,
    currency: "USD",
  });
};
