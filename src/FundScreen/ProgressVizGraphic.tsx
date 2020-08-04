import React, { useEffect, useState } from "react";
import { withFirebase } from "../Core/Firebase";
import { numberWithCommas } from "../Utils";

function Truck(props: any) {
  return (
    <div
      style={{
        transform: "scale(-1,1) translate(50%)",
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
        transform: "scale(1, 1) translate(50%,0%)", // when 95% is reached
        // "scale(-1,1)",

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

function ProgressVizGraphicBase({ firebase }: any) {
  const [campaignDetails, setCampaignDetails] = useState({
    current: 0,
    target: 0.01,
  });
  useEffect(() => {
    const query = firebase.db.collection("info").doc("collegefundcampaign");
    const unsubscribe = query.onSnapshot((doc: any) => {
      const { current, target } = doc.data();
      setCampaignDetails({
        current,
        target,
      });
    });
    return () => {
      unsubscribe();
    };
  }, [firebase]);

  let current = numberWithCommas(Math.round(campaignDetails.current / 100));
  let target = numberWithCommas(Math.round(campaignDetails.target / 100));
  let percentage = (campaignDetails.current * 100) / campaignDetails.target;
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
        placeItems: "center",
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
              left: `max(0px, ${percentage}% - 3em)`,
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
            <b>${current}</b> raised of <b>${target}</b> target
          </p>
        </div>
      </div>
    </div>
  );
}

const ProgressVizGraphic = withFirebase(ProgressVizGraphicBase);

export default ProgressVizGraphic;
