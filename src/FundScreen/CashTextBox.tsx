import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import "./styles.css";
import { tokenHandler } from "../Core/TokenManager";
import { STRIPE_PUBLISHABLE_KEY } from "../Core/Config";

export default function CashTextBox(props: any) {
  const [currentValue, setCurrentValue] = useState(props.valueAmount);
  function handleValueChange(evt: any) {
    console.log("i was called");
    setCurrentValue(evt.target.value);
  }
  return (
    <div
      style={{
        width: "80%",
        maxWidth: "400px",
        height: "100%",
        margin: "auto",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "80%",
          height: "2.5em",
        }}
      >
        <input
          className="defocused"
          placeholder="$10"
          type="number"
          value={props.valueAmount}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: "22px",
            top: 0,
            left: 0,
            border: "1px solid #DBDBDB",
            background: "linear-gradient(0deg, #EFEFEF, #FFFFFF)",
            boxSizing: "border-box",
            paddingLeft: "1.5em",
            caretColor: "#3e82fa",
          }}
        />
        <StripeCheckout
          token={tokenHandler}
          stripeKey={STRIPE_PUBLISHABLE_KEY}
          image="https://instagram.fdel1-3.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/50237879_360623924521784_7002129199752869717_n.jpg?_nc_ht=instagram.fdel1-3.fna.fbcdn.net&_nc_cat=108&_nc_ohc=BwGMjXEih1cAX_BTLVU&oh=101f7850328d724e62978263bc2c0774&oe=5F4087B7" // the pop-in header image (default none)
          name="Parth's Transcript Fund" // the pop-in header title
          description="Thank you for helping me release my transcript from a business hold" // the pop-in header subtitle
          ComponentClass="div"
          panelLabel="Donate" // prepended to the amount in the bottom pay button
          amount={1000000} // cents
          currency="USD"
          allowRememberMe={false}
        >
          <span
            style={{
              position: "absolute",
              right: "1em",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#4B89F6",
              fontWeight: 500,
              textDecoration: "none",
              userSelect: "none",
            }}
          >
            Invest
          </span>
        </StripeCheckout>
      </div>
    </div>
  );
}
