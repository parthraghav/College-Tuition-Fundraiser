import React, { Component } from "react";
import AtomicImage from "./AtomicImage";

enum GogglePos {
  Out,
  On,
  Down,
  Up,
}

enum BackgroundPosition {
  HalfLeft,
  Center,
}

interface PersonalityAnimatedBackgroundState {
  window_width: number;
  window_height: number;
  backgroundLeftMargin: number;
}
//0.32203389839
//90497836_205798060836274_1081335742664220290_n
export default class PersonalityAnimatedBackground extends Component<
  any,
  PersonalityAnimatedBackgroundState
> {
  foregroundToBackgroundHorizontalRatio: number = 0.32203389839 * 100;
  foregroundToBackgroundVerticalRatio: number = (210 / 551) * 100;

  constructor(props: any) {
    super(props);
    this.state = { window_width: 0, window_height: 0, backgroundLeftMargin: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      window_width: window.innerWidth,
      window_height: window.innerHeight,
    });
  }

  set_goggle_pos = (goggle_pos: GogglePos) => {};

  set_background_pos = (background_pos: BackgroundPosition) => {
    console.log(background_pos == BackgroundPosition.Center);
    var backgroundLeftMargin;
    const img_width = this.state.window_height * (1080 / 564);
    const window_width = this.state.window_width;

    switch (background_pos) {
      case BackgroundPosition.HalfLeft:
        backgroundLeftMargin = -img_width / 2;
        break;
      case BackgroundPosition.Center:
        backgroundLeftMargin = (window_width - img_width) / 2;
        break;
    }
    console.log(window_width, img_width, backgroundLeftMargin);

    this.setState({
      backgroundLeftMargin: backgroundLeftMargin,
    });
  };

  map_goggle_state_to_pos = () => {
    //(this.state.window_width - img_width) / 2
    //-img_width / 2
  };

  render() {
    const img_width = this.state.window_height * (1080 / 564);
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          //height: "-webkit-fill-available",
          backgroundColor: "#f0eef1",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: this.state.backgroundLeftMargin + "px",
          }}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F90497836_205798060836274_1081335742664220290_n.jpg?alt=media"
            onLoad={() => this.set_background_pos(BackgroundPosition.Center)}
            style={{
              width: `${img_width}px`,
              zIndex: 1,
            }}
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F1431436876.png?alt=media"
            style={{
              position: "absolute",
              width: this.foregroundToBackgroundHorizontalRatio + "%",
              top: this.foregroundToBackgroundVerticalRatio + "%",
              left: "50%",
              transform: "translate(-50%, 20%)",
              zIndex: 2,
            }}
          />
        </div>
      </div>
    );
  }
}
//90497836_205798060836274_1081335742664220290_n.jpg
//90497836_205798060836274_1081335742664220290_n.jpg

/* 

      <div
        style={{
          width: "100vw",
        }}
      >
        <div style={{ position: "absolute", left: "-540px" }}>
          <div
            style={{
              width: "auto",
              height: "100vh",
              backgroundColor: "#f0eef1",
              position: "relative",
              overflow: "hidden",
              backgroundRepeat: "no-repeat",
              backgroundImage:
                "url('https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F90497836_205798060836274_1081335742664220290_n.jpg?alt=media')",
            }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F1431436876.png?alt=media"
              style={{}}
            />
          </div>
        </div>
      </div>

      
*/
