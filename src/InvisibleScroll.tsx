import React, { Component } from "react";

interface InvisibleScrollState {}

function between(x: number, min: number, max: number) {
  return x >= min && x <= max;
}

export default class InvisibleScroll extends Component<
  any,
  InvisibleScrollState
> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  handleScroll = (e: any) => {
    let element = e.target;
    if (element.clientHeight === 0) {
      return;
    }
    let scrollPercentage =
      (element.scrollTop * 100) / (element.scrollHeight - element.clientHeight);

    if (between(scrollPercentage, 0, 10)) {
      // do something at end of scroll
      console.log("somewhere");
    }
  };
  render() {
    return (
      <div
        style={{
          position: "absolute",
          overflow: "scroll",
          height: "100vh",
          width: "100vw",
        }}
        onScroll={this.handleScroll}
      >
        <div
          style={{
            position: "absolute",
            height: "500vh",
            width: "100vw",
          }}
        ></div>
      </div>
    );
  }
}
