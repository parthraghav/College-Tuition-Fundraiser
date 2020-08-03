import React from "react";

export default function AlertBox() {
  return (
    <div
      style={{
        width: "80%",
        maxWidth: "600px",
        height: "100%",
        margin: "auto",
        display: "grid",
        placeItems: "end",
        userSelect: "none",
        marginBottom: "1em",
      }}
    >
      <p className="alertbox">
        Tuition due from last semester is <b>$24,803</b>. The payment provider
        Stripe charges <b>2.9% + 30¢</b> per successful donation. I'm raising an
        amount of $25,745 that, after deducting a Stripe{" "}
        <a href="https://stripe.com/pricing">commission</a> on 650 donations,
        will equal exactly the amount I'm due to pay in tuition debt.
      </p>
    </div>
  );
}
