import React from "react";

function Truck(props: any) {
  return (
    <div
      style={{
        transform: "scale(-1,1)",
        maxWidth: "fit-content",
        ...props.style,
      }}
    >
      <span
        role="img"
        aria-label="Truck"
        style={{
          fontSize: "2em",
        }}
      >
        🚗
      </span>
    </div>
  );
}

function Flag(props: any) {
  return (
    <div
      style={{
        transform: "scale(-1,1)",
        maxWidth: "fit-content",
        ...props.style,
      }}
    >
      <span
        role="img"
        aria-label="Milestone"
        style={{
          fontSize: "2em",
        }}
      >
        🏁
      </span>
    </div>
  );
}

export default function ProgressVizGraphic(props: any) {
  return (
    <div
      style={{
        width: "80%",
        maxWidth: "400px",
        height: "100%",
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "stretch",
        margin: "auto",
        display: "grid",
        placeItems: "end",
        userSelect: "none",
      }}
    >
      <div style={{ width: "100%", transform: "translate(0,1em)" }}>
        <div
          style={{
            height: "0.8em",
            borderRadius: 50,
            background: "linear-gradient(0deg,#00AC17,#4BC25C)",
            position: "relative",
            bottom: 0,
            width: "80%",
            margin: "auto",
          }}
        >
          <Flag
            style={{
              position: "absolute",
              bottom: "0.3em",
              right: 0,
            }}
          />
          <Truck
            style={{
              position: "absolute",
              bottom: "0.3em",
              left: "calc(30% - 2em)",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: "0.6em",
            }}
          >
            <b>$4,500</b> raised of <b>$25,000</b> target
          </p>
        </div>
      </div>
    </div>
  );
}
