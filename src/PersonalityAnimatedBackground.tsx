import React, { Component } from "react";
import AtomicImage from "./AtomicImage";

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
        <AtomicImage
          src="./1431436876.png"
          position_inferer={this.foreground_position_inferer}
          style={{
            position: "absolute",
            height: 10,
          }}
        />
        <AtomicImage
          src="./90497836_205798060836274_1081335742664220290_n.jpg"
          position_inferer={this.background_position_inferer}
          style={{
            position: "relative",
            height: this.state.height,
          }}
        />
      </div>
    );
  }
  foreground_position_inferer = (img_width: number, img_height: number) => {
    return {
      left: 0,
      top: 0,
    };
  };

  background_position_inferer = (img_width: number, img_height: number) => {
    var viewport_width = this.state.width;
    var viewport_height = this.state.height;
    console.log(img_width, viewport_width);
    return {
      left: -img_width / 2,
      top: 0,
    };
  };
}
//90497836_205798060836274_1081335742664220290_n.jpg
//90497836_205798060836274_1081335742664220290_n.jpg
