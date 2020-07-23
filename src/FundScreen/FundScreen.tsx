import React, { useState } from "react";
import ProgressVizGraphic from "./ProgressVizGraphic";
import CashTextBox from "./CashTextBox";
import QuickPaySelector from "./QuickPaySelector";
import DonorList from "./DonorList";
import { FirebaseContext } from "../Core/Firebase";

interface FundScreenState {}

export default function FundScreen() {
  const [valueAmount, setValueAmount] = useState(0);

  return (
    <div
      style={{
        // position: "absolute",
        // left: 0,
        // top: 0,
        // height: "100%",
        width: "100%",
        background:
          "url(https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F99694392183429944_43522157_2421-min.png?alt=media)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "block",
        paddingBottom: "16%",
        // flexDirection: "column",
        // overflow: "scroll",
      }}
    >
      <div
        style={{
          height: "20vh",
          minHeight: "128px",
        }}
      >
        <ProgressVizGraphic />
      </div>
      <div
        style={{
          height: "20vh",
          minHeight: "128px",
        }}
      >
        <CashTextBox valueAmount={valueAmount} />
      </div>
      <div
        style={{
          height: "24vh",
          minHeight: "150px",
        }}
      >
        <QuickPaySelector
          onValueChange={(newVal: any) => setValueAmount(newVal)}
        />
      </div>
      <div
        style={
          {
            // height: "20vh",
            // backgroundColor: "violet",
          }
        }
      >
        <FirebaseContext.Consumer>
          {(firebase) => {
            return <DonorList />;
          }}
        </FirebaseContext.Consumer>
      </div>
    </div>
  );
}
