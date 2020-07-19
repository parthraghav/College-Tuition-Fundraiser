import React, { Component } from "react";

interface IntroTextState {}

export default class IntroText extends Component<any, IntroTextState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(prevProps: any) {
    console.log(prevProps);
    if (prevProps.labelTitle == undefined && prevProps.labelSubtext == undefined) {
        this.
    }
    // if (prevProps.labelSubtext !== this.props.text) {
    //   this.updateAndNotify();
    // }
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "20%",
          bottom: this.props.hidden ? "-20%" : 0,
          color: "white",
          transition: "bottom 1s",
          textAlign: "center",
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.77), rgba(0, 0, 0, 0.48), transparent)",
        }}
      >
        <h3>{this.props.labelSubtext}</h3>
        <h1>{this.props.labelTitle}</h1>
      </div>
    );
  }
}
