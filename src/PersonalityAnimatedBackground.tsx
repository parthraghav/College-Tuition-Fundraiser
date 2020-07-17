import React, { Component } from "react";

interface PersonalityAnimatedBackgroundState {
  width: number;
  height: number;
}

//90497836_205798060836274_1081335742664220290_n
export default class PersonalityAnimatedBackground extends Component<
  any,
  PersonalityAnimatedBackgroundState
> {
  constructor(props: any) {
    super(props);
    this.state = { width: 0, height: 0 };
    this._updateWindowDimensions = this._updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this._updateWindowDimensions();
    window.addEventListener("resize", this._updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._updateWindowDimensions);
  }

  _updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <div
        style={{
          width: this.state.width,
          height: this.state.height,
          backgroundColor: "red",
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <img
          src="90497836_205798060836274_1081335742664220290_n.jpg"
          style={{
            position: "relative",
            height: this.state.height,
            left: -this.state.width / 2,
          }}
        />
      </div>
    );
  }
}
