import React from "react";
import "./styles.css";

export default function QuickPayRadioButton(props: any) {
  return (
    <div
      onClick={() => props.onClick(props.index)}
      className="quickPayRadioButton"
      style={{
        background: props.focused
          ? "linear-gradient(0deg,#00AC17,#4BC25C)"
          : "linear-gradient(0deg,#4B89F6,#2E7AFF)",
        transform: props.focused ? "scale(0.9,0.9)" : "scale(1,1)",
        transition: "transform 0.2s",
        padding: "0px 10px",
        borderRadius: 50,
        textAlign: "center",
        marginTop: 4,
        marginBottom: 4,
        width: "fit-content",
        display: "inline-grid",
        placeItems: "center",
        gridTemplateColumns: "1fr 1fr",
        margin: "4px 4px",
        cursor: "pointer",
        userSelect: "none",
        WebkitTapHighlightColor: "rgba(255, 0, 0, 0)",
        outline: "none",
      }}
    >
      <span style={{ fontSize: "2em" }}>{props.emoji}</span>
      <span style={{ color: "#FFFFFF", fontSize: "1.1em", fontWeight: 500 }}>
        {`$${props.amount}`}
      </span>
    </div>
  );
}
