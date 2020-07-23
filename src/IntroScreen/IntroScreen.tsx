import React, { Component, useEffect } from "react";
import AtomicImage from "./AtomicImage";
import useWindowSize from "./useWindowSize.hook";

const get_slide_details = (slideNum: number) => {
  let currentBackgroundPos, currentGogglePos;
  switch (slideNum) {
    case 1:
      currentBackgroundPos = BackgroundPosition.HalfLeft;
      currentGogglePos = GogglePos.On;
      break;
    case 2:
      currentBackgroundPos = BackgroundPosition.Center;
      currentGogglePos = GogglePos.Out;
      break;
    case 3:
      currentBackgroundPos = BackgroundPosition.Center;
      currentGogglePos = GogglePos.Out;
      break;
    case 4:
      currentBackgroundPos = BackgroundPosition.Center;
      currentGogglePos = GogglePos.Down;
      break;
    case 5:
      currentBackgroundPos = BackgroundPosition.Center;
      currentGogglePos = GogglePos.On;
      break;
    case 6:
      currentBackgroundPos = BackgroundPosition.Center;
      currentGogglePos = GogglePos.Up;
      break;
    case 7:
      currentBackgroundPos = BackgroundPosition.Center;
      currentGogglePos = GogglePos.Out;
      break;
    default:
      currentBackgroundPos = BackgroundPosition.Center;
      currentGogglePos = GogglePos.On;
      break;
  }
  return { currentBackgroundPos, currentGogglePos };
};

const get_foreground_transform = (goggle_pos: GogglePos) => {
  var foregroundTransform;
  switch (goggle_pos) {
    case GogglePos.Out:
      foregroundTransform = "translate(0%, -1000%)";
      break;
    case GogglePos.On:
      foregroundTransform = "translate(-50%, 0%)";
      break;
    case GogglePos.Down:
      foregroundTransform = "translate(-50%, 20%)";
      break;
    case GogglePos.Up:
      foregroundTransform = "translate(-50%, -140%) scale(1,-1)";
      break;
  }
  // this.setState({
  //   foregroundTransform,
  // });
  return foregroundTransform;
};

const get_background_left_margin = (
  background_pos: BackgroundPosition,
  window_dimension: any
) => {
  var backgroundLeftMargin;
  const img_width = window_dimension.height * (1080 / 564);
  const window_width = window_dimension.height;

  switch (background_pos) {
    case BackgroundPosition.HalfLeft:
      backgroundLeftMargin = -img_width / 2;
      break;
    case BackgroundPosition.Center:
      backgroundLeftMargin = (window_width - img_width) / 2;
      break;
  }

  // this.setState({
  //   backgroundLeftMargin,
  // });
  return backgroundLeftMargin;
};

const get_anim_tuple = (slideNum: number, window_dimension: any) => {
  const { currentBackgroundPos, currentGogglePos } = get_slide_details(
    slideNum
  );
  const backgroundLeftMargin = get_background_left_margin(
    currentBackgroundPos,
    window_dimension
  );
  const foregroundTransform = get_foreground_transform(currentGogglePos);

  return {
    backgroundLeftMargin,
    foregroundTransform,
  };
};

function between(x: number, min: number, max: number) {
  return x >= min && x <= max;
}

const get_nearest_scroll_activation = (
  scroll_activations_map: any,
  scroll_activations_keys: string[],
  scroll_y: number
) => {
  for (let index = 0; index < scroll_activations_keys.length; index++) {
    const key = parseInt(scroll_activations_keys[index]);
    let range: number[];
    if (index == 0) {
      range = [0, key];
    } else if (index < scroll_activations_keys.length) {
      range = [parseInt(scroll_activations_keys[index - 1]), key];
    } else {
      throw new Error("Index not in range");
    }
    if (between(scroll_y, range[0], range[1])) {
      let interpolation = (scroll_y - range[0]) / (range[1] - range[0]);
      return {
        interpolation,
        ...scroll_activations_map[key.toString()],
      };
    }
  }
};

export default function IntroScreen({ scrollY, scrollDirection }: any) {
  const win_dim = useWindowSize();

  const foregroundToBackgroundHorizontalRatio: number = 0.32203389839 * 100;
  const foregroundToBackgroundVerticalRatio: number = (210 / 551) * 100;
  const BACKGROUND_IMG_URL =
    "https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F90497836_205798060836274_1081335742664220290_n.jpg?alt=media";
  const FOREGROUND_IMG_URL =
    "https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F1431436876.png?alt=media";
  let img_width;
  if (win_dim.height != undefined) {
    img_width = win_dim.height * (1080 / 564);
  }
  const scroll_activations_map = {
    1: get_anim_tuple(1, win_dim),
    700: get_anim_tuple(2, win_dim),
    850: get_anim_tuple(3, win_dim),
    1000: get_anim_tuple(4, win_dim),
    1150: get_anim_tuple(5, win_dim),
    1300: get_anim_tuple(6, win_dim),
    1450: get_anim_tuple(7, win_dim),
  };
  const scroll_activations_keys = Object.keys(scroll_activations_map).sort();

  useEffect(() => {});

  get_nearest_scroll_activation(
    scroll_activations_map,
    scroll_activations_keys,
    scrollY
  );

  return (
    <div style={{ background: "gray", height: "200vh" }}>
      <div
        style={{
          position: "absolute",
          left: backgroundLeftMargin,
          transition: "left 2s",
          overflow: "hidden",
        }}
      >
        <img
          src={BACKGROUND_IMG_URL}
          style={{
            width: img_width,
          }}
        />
        <img
          src={FOREGROUND_IMG_URL}
          style={{
            position: "absolute",
            width: foregroundToBackgroundHorizontalRatio + "%",
            top: foregroundToBackgroundVerticalRatio + "%",
            left: "50%",
            transform: foregroundTransform,
            transition: "transform 2s",
          }}
        />
      </div>
    </div>
  );
}

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

interface IntroScreenState {
  window_width: number;
  window_height: number;
  backgroundLeftMargin: number;
  foregroundTransform: string;
}
class _IntroScreen extends Component<any, IntroScreenState> {
  foregroundToBackgroundHorizontalRatio: number = 0.32203389839 * 100;
  foregroundToBackgroundVerticalRatio: number = (210 / 551) * 100;

  activation_table = {};

  constructor(props: any) {
    super(props);
    this.state = {
      window_width: 0,
      window_height: 0,
      backgroundLeftMargin: 0,
      foregroundTransform: "unset",
    };
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

  get_slide_details = (slideNum: number) => {
    let currentBackgroundPos, currentGogglePos;
    switch (slideNum) {
      case 1:
        currentBackgroundPos = BackgroundPosition.HalfLeft;
        currentGogglePos = GogglePos.On;
        break;
      case 2:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.Out;
        break;
      case 3:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.Out;
        break;
      case 4:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.Down;
        break;
      case 5:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.On;
        break;
      case 6:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.Up;
        break;
      case 7:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.Out;
        break;
      default:
        currentBackgroundPos = BackgroundPosition.Center;
        currentGogglePos = GogglePos.On;
        break;
    }
    return { currentBackgroundPos, currentGogglePos };
  };

  get_foreground_transform = (goggle_pos: GogglePos) => {
    var foregroundTransform;
    switch (goggle_pos) {
      case GogglePos.Out:
        foregroundTransform = "translate(0%, -1000%)";
        break;
      case GogglePos.On:
        foregroundTransform = "translate(-50%, 0%)";
        break;
      case GogglePos.Down:
        foregroundTransform = "translate(-50%, 20%)";
        break;
      case GogglePos.Up:
        foregroundTransform = "translate(-50%, -140%) scale(1,-1)";
        break;
    }
    // this.setState({
    //   foregroundTransform,
    // });
    return foregroundTransform;
  };

  get_background_left_margin = (background_pos: BackgroundPosition) => {
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

    // this.setState({
    //   backgroundLeftMargin,
    // });
    return backgroundLeftMargin;
  };

  render() {
    const img_width = this.state.window_height * (1080 / 564);
    const { currentBackgroundPos, currentGogglePos } = this.get_slide_details(
      this.props.slideNum
    );
    const backgroundLeftMargin = this.get_background_left_margin(
      currentBackgroundPos
    );
    const foregroundTransform = this.get_foreground_transform(currentGogglePos);

    return (
      <div style={{ background: "gray", height: "200vh" }}>
        <div
          style={{
            position: "absolute",
            left: backgroundLeftMargin + "px",
            transition: "left 2s",
            overflow: "hidden",
          }}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F90497836_205798060836274_1081335742664220290_n.jpg?alt=media"
            //onLoad={() => this.set_background_pos(BackgroundPosition.HalfLeft)}
            style={{
              width: `${img_width}px`,
            }}
          />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F1431436876.png?alt=media"
            //onLoad={() => this.set_goggle_pos(GogglePos.On)}
            style={{
              position: "absolute",
              width: this.foregroundToBackgroundHorizontalRatio + "%",
              top: this.foregroundToBackgroundVerticalRatio + "%",
              left: "50%",
              transform: foregroundTransform,
              transition: "transform 2s",
            }}
          />
        </div>
      </div>
    );
  }
}
