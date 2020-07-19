import React, { Component } from "react";

interface InvisibleScrollState {}

function between(x: number, min: number, max: number) {
  return x >= min && x <= max;
}

enum ScrollDirection {
  Negative, // Going up
  Positive, // Going down
}

export default class InvisibleScroll extends Component<
  any,
  InvisibleScrollState
> {
  lastScrollPercentage: number = 0;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  handleScroll = (e: any) => {
    let element = e.target;
    if (element.clientHeight === 0) {
      return;
    }
    let currentScrollPercentage =
      (element.scrollTop * 100) / (element.scrollHeight - element.clientHeight);
    let threshmap = this.props.threshmap;
    let keys = Object.keys(threshmap);
    keys.sort().forEach((key, index) => {
      let range: number[];
      let keyNum = parseInt(key);
      if (index == 0) {
        range = [0, keyNum];
      } else if (index < keys.length) {
        range = [parseInt(keys[index - 1]), keyNum];
      } else {
        throw new Error("Index not in range");
      }
      if (between(currentScrollPercentage, range[0], range[1])) {
        let fn = threshmap[key];
        let scrollDirection =
          currentScrollPercentage > this.lastScrollPercentage
            ? ScrollDirection.Positive
            : ScrollDirection.Negative;
        // call the callback function
        fn(scrollDirection);
      }
    });
    this.lastScrollPercentage = currentScrollPercentage;
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

export { ScrollDirection };
