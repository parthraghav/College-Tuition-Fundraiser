import React, { Component } from "react";

interface IntroTextState {}

let textStyle = {
  display: "block",
  fontWeight: "bold",
} as React.CSSProperties;

export default class IntroText extends Component<any, IntroTextState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(prevProps: any) {
    if (
      prevProps.labelTitle == undefined &&
      prevProps.labelSubtext == undefined
    ) {
      // setup smoothing animation here
    }
    // if (prevProps.labelSubtext !== this.props.text) {
    //   this.updateAndNotify();
    // }
  }

  render() {
    return (
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "20%",
          bottom: this.props.hidden ? "-20%" : 0,
          color: "white",
          transition: "bottom 1s",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.77), rgba(0, 0, 0, 0.48), transparent)",
        }}
      >
        <span style={{ ...textStyle, fontSize: "1em" }}>
          {this.props.labelSubtext}
        </span>
        <span style={{ ...textStyle, fontSize: "2em" }}>
          {this.props.labelTitle}
        </span>
      </div>
    );
  }
}
