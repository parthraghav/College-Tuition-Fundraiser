import { FirebaseApp } from "./Firebase";

export const tokenHandler = (
  token: any,
  amount: number,
  name: string,
  callbacks: any
) => {
  const transactedAmount = amount * 100;
  const { id, email } = token;
  console.log(token);
  processPayment(token, id, email, transactedAmount, name, callbacks);
};

export const processPayment = async (
  token: any,
  id: string,
  email: string,
  transactedAmount: number,
  name: string,
  callbacks: any
) => {
  try {
    const paymentsRef = FirebaseApp.db.collection("payments");
    const _docId = id.slice(4, id.length);
    console.log(name);
    await paymentsRef.doc(_docId).set({
      id: id,
      email: email,
      name: name,
      token: token,
      amount: transactedAmount,
      currency: "USD",
    });
    callbacks.success();
  } catch (e) {
    callbacks.error();
  }
};
