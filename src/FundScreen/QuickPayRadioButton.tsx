import React from "react";

export default function QuickPayRadioButton(props: any) {
  return (
    <div
      onClick={() => console.log("clicked")}
      style={{
        background: props.focused
          ? "linear-gradient(0deg,#00AC17,#4BC25C)"
          : "linear-gradient(0deg,#4B89F6,#2E7AFF)",
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
      }}
    >
      <span style={{ fontSize: "2em" }}>{props.emoji}</span>
      <span style={{ color: "#FFFFFF", fontSize: "1.1em", fontWeight: 500 }}>
        {props.label}
      </span>
    </div>
  );
}
