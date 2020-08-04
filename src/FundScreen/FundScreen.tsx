import React, { useState } from "react";
import AlertBox from "./AlertBox";
import ProgressVizGraphic from "./ProgressVizGraphic";
import CashTextBox from "./CashTextBox";
import QuickPaySelector from "./QuickPaySelector";
import DonorList from "./DonorList";
import { FirebaseContext } from "../Core/Firebase";
import { tokenHandler } from "../Core/TokenManager";
import { FinalizingPrompt } from "./FinalizingPrompt";
import "./styles.css";

interface FundScreenState {}

export default function FundScreen() {
  const [valueAmount, setValueAmount] = useState(10);
  const [token, setToken] = useState(null);
  const [finalizingPromptState, setFinalizingPromptState] = useState(
    "SUBMITTING" // "WAITING" "SUCCESSFUL"
  );
  const [isFinalizingPromptVisible, setIsFinalizingPromptVisible] = useState(
    false
  );

  const handleToken = async (token: any) => {
    setIsFinalizingPromptVisible(true);
    setToken(token);
  };

  const handleFormSubmit = async (name: string) => {
    function error() {
      setFinalizingPromptState("ERROR");
    }
    function success() {
      setFinalizingPromptState("SUCCESSFUL");
    }
    setFinalizingPromptState("WAITING");
    await tokenHandler(token, valueAmount, name, { success, error });
    setTimeout(() => {
      setIsFinalizingPromptVisible(false);
      setFinalizingPromptState("SUBMITTING");
    }, 3000);
  };

  return (
    <div
      style={{
        // position: "absolute",
        // left: 0,
        // top: 0,
        // height: "100%",
        position: "relative",
        width: "100%",
        background:
          "url('https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F99694392183429944_43522157_2421-min.png?alt=media')",
        backgroundSize: "contain",
        backgroundRepeat: "repeat",
        display: "block",
        paddingBottom: "20vh",
        paddingTop: "1em",
        // paddingBottom: "120px",
        // flexDirection: "column",
        // overflow: "scroll",
      }}
    >
      <div
        style={{
          paddingTop: "1em",
        }}
      >
        <AlertBox />
        <ProgressVizGraphic />
      </div>
      <div
        style={{
          height: "10vh",
          minHeight: "128px",
        }}
      >
        <CashTextBox
          valueAmount={valueAmount}
          onValueChange={setValueAmount}
          onSubmit={handleToken}
        />
      </div>
      <div
        style={{
          height: "24vh",
          minHeight: "150px",
        }}
      >
        <QuickPaySelector
          valueAmount={valueAmount}
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
      {isFinalizingPromptVisible && (
        <FinalizingPrompt
          onSubmit={handleFormSubmit}
          state={finalizingPromptState}
        />
      )}
    </div>
  );
}
