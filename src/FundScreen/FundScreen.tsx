import React, { Component } from "react";
import ProgressVizGraphic from "./ProgressVizGraphic";
import CashTextBox from "./CashTextBox";

interface FundScreenState {}

export default class FundScreen extends Component<any, FundScreenState> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: "100%",
          background:
            "url(https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F99694392183429944_43522157_2421.png?alt=media)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "20vh",
          }}
        >
          <ProgressVizGraphic />
        </div>
        <div
          style={{
            height: "20vh",
          }}
        >
          <CashTextBox />
        </div>
        <div
          style={{
            height: "24vh",
          }}
        ></div>
        <div
          style={{
            height: "20vh",
            backgroundColor: "violet",
          }}
        ></div>
        <p>Hello World!</p>
      </div>
    );
  }
}
