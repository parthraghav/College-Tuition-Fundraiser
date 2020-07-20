import React from "react";
import "./styles.css";

export default function CashTextBox(props: any) {
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
        <a
          href=""
          style={{
            position: "absolute",
            right: "1em",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#4B89F6",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Invest
        </a>
      </div>
    </div>
  );
}
