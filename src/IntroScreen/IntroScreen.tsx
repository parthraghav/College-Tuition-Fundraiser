import React, { useEffect } from "react";
import { useWindowSize } from "../Utils";
import { interpolate } from "gsap/all";
import IntroText from "./IntroText";
import { between } from "../Utils";

const thresholdfactor = 2;

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

const interpolate_transformations_with_scroll = (
  cached_activation_obj: any,
  scroll_activations: any,
  scroll_y: number
) => {
  let activation_obj;

  if (cached_activation_obj === undefined) {
    for (let index = 0; index < scroll_activations.length; index++) {
      const { scrollRange } = scroll_activations[index];
      if (
        between(
          scroll_y,
          thresholdfactor * scrollRange[0],
          thresholdfactor * scrollRange[1]
        )
      ) {
        activation_obj = scroll_activations[index];
        break;
      }
    }
  } else {
    activation_obj = cached_activation_obj;
  }
  const {
    scrollRange,
    backgroundTransformation,
    foregroundTransformation,
  } = activation_obj;
  let interpolation_value =
    (scroll_y - thresholdfactor * scrollRange[0]) /
    ((scrollRange[1] - scrollRange[0]) * thresholdfactor);
  // console.log(interpolation_value, scrollRange);
  return {
    backgroundTransformation: interpolate(
      backgroundTransformation[0],
      backgroundTransformation[1]
    )(interpolation_value),
    foregroundTransformation: interpolate(
      foregroundTransformation[0],
      foregroundTransformation[1]
    )(interpolation_value),
  };
};

const get_foreground_transform = (goggle_pos: GogglePos) => {
  var foregroundTransform;
  switch (goggle_pos) {
    case GogglePos.Out:
      foregroundTransform = "translate(0%, -1000%) scale(1,1)";
      break;
    case GogglePos.On:
      foregroundTransform = "translate(-50%, 0%) scale(1,1)";
      break;
    case GogglePos.Down:
      foregroundTransform = "translate(-50%, 20%) scale(1,1)";
      break;
    case GogglePos.Up:
      foregroundTransform = "translate(-50%, -140%) scale(1,-1)";
      break;
  }
  return { transform: foregroundTransform };
};

const get_background_left_margin = (
  background_pos: BackgroundPosition,
  window_dimension: any
) => {
  var backgroundLeftMargin;
  const img_width = window_dimension.height * (1080 / 564);
  const window_width = window_dimension.width;

  switch (background_pos) {
    case BackgroundPosition.HalfLeft:
      backgroundLeftMargin = -img_width / 2;
      break;
    case BackgroundPosition.Center:
      backgroundLeftMargin = (window_width - img_width) / 2;
      break;
  }
  return { left: backgroundLeftMargin };
};

const get_intro_text = (scroll_y: number) => {
  let labelSubtext, labelTitle;
  const introTextLabelArr = [
    "Hi",
    "I'm Parth",
    "I am a 20 year old proud gay man.",
    "I have a dream to get a college degree",
    "This is my story",
  ];

  if (between(scroll_y, thresholdfactor * 200, thresholdfactor * 300)) {
    labelSubtext = "";
    labelTitle = introTextLabelArr[0];
  } else if (between(scroll_y, thresholdfactor * 300, thresholdfactor * 400)) {
    labelSubtext = introTextLabelArr[0];
    labelTitle = introTextLabelArr[1];
  } else if (between(scroll_y, thresholdfactor * 400, thresholdfactor * 500)) {
    labelSubtext = introTextLabelArr[1];
    labelTitle = introTextLabelArr[2];
  } else if (between(scroll_y, thresholdfactor * 500, thresholdfactor * 600)) {
    labelSubtext = introTextLabelArr[2];
    labelTitle = introTextLabelArr[3];
  } else if (between(scroll_y, thresholdfactor * 600, thresholdfactor * 700)) {
    labelSubtext = introTextLabelArr[3];
    labelTitle = introTextLabelArr[4];
  }

  return {
    labelSubtext,
    labelTitle,
  };
};

export default function IntroScreen({ scrollInfo }: any) {
  const win_dim = useWindowSize();
  const foregroundToBackgroundHorizontalRatio: number = 0.32203389839 * 100;
  const foregroundToBackgroundVerticalRatio: number = (210 / 551) * 100;
  const BACKGROUND_IMG_URL =
    "https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F90497836_205798060836274_1081335742664220290_n.jpg?alt=media";
  const FOREGROUND_IMG_URL =
    "https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F1431436876.png?alt=media";
  let img_width;
  if (win_dim.height !== undefined) {
    img_width = win_dim.height * (1080 / 564);
  } else {
    alert("something went wrong finding the window size");
  }

  const scroll_activations = [
    {
      scrollRange: [-100, 0],
      backgroundTransformation: [
        get_background_left_margin(BackgroundPosition.HalfLeft, win_dim),
        get_background_left_margin(BackgroundPosition.HalfLeft, win_dim),
      ],
      foregroundTransformation: [
        get_foreground_transform(GogglePos.On),
        get_foreground_transform(GogglePos.On),
      ],
    },
    {
      scrollRange: [0, 300],
      backgroundTransformation: [
        get_background_left_margin(BackgroundPosition.HalfLeft, win_dim),
        get_background_left_margin(BackgroundPosition.HalfLeft, win_dim),
      ],
      foregroundTransformation: [
        get_foreground_transform(GogglePos.On),
        get_foreground_transform(GogglePos.On),
      ],
    },
    {
      scrollRange: [300, 400],
      backgroundTransformation: [
        get_background_left_margin(BackgroundPosition.Center, win_dim),
        get_background_left_margin(BackgroundPosition.Center, win_dim),
      ],
      foregroundTransformation: [
        get_foreground_transform(GogglePos.On),
        get_foreground_transform(GogglePos.Down),
      ],
    },
    {
      scrollRange: [400, 500],
      backgroundTransformation: [
        get_background_left_margin(BackgroundPosition.Center, win_dim),
        get_background_left_margin(BackgroundPosition.Center, win_dim),
      ],
      foregroundTransformation: [
        get_foreground_transform(GogglePos.Down),
        get_foreground_transform(GogglePos.On),
      ],
    },
    {
      scrollRange: [500, 600],
      backgroundTransformation: [
        get_background_left_margin(BackgroundPosition.Center, win_dim),
        get_background_left_margin(BackgroundPosition.Center, win_dim),
      ],
      foregroundTransformation: [
        get_foreground_transform(GogglePos.On),
        get_foreground_transform(GogglePos.Up),
      ],
    },
    {
      scrollRange: [600, 700],
      backgroundTransformation: [
        get_background_left_margin(BackgroundPosition.Center, win_dim),
        get_background_left_margin(BackgroundPosition.Center, win_dim),
      ],
      foregroundTransformation: [
        get_foreground_transform(GogglePos.Up),
        get_foreground_transform(GogglePos.Up),
      ],
    },
    {
      scrollRange: [700, 10000],
      backgroundTransformation: [
        get_background_left_margin(BackgroundPosition.Center, win_dim),
        get_background_left_margin(BackgroundPosition.Center, win_dim),
      ],
      foregroundTransformation: [
        get_foreground_transform(GogglePos.Up),
        get_foreground_transform(GogglePos.Out),
      ],
    },
  ];

  useEffect(() => {});

  const {
    backgroundTransformation,
    foregroundTransformation,
  } = interpolate_transformations_with_scroll(
    undefined,
    scroll_activations,
    scrollInfo.scrollYAbsolute
  );

  // console.log("ppp", scrollInfo);

  return (
    <div
      style={{
        height: thresholdfactor * 700 + 800 + "px",
        // height: "350vh"
      }}
    >
      <div style={{ height: "100vh" }}>
        <div
          style={{
            height: thresholdfactor * 700 + 800 + "px",
            // height: "350vh"
          }}
        />
      </div>
      <div
        style={{
          ...backgroundTransformation,
          position: "fixed",
          top: 0,
          transition: "left 0.5s",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <img
          src={BACKGROUND_IMG_URL}
          alt="Parth"
          style={{
            width: img_width,
          }}
        />
        <img
          src={FOREGROUND_IMG_URL}
          alt="rainbow colored glasses"
          style={{
            ...foregroundTransformation,
            position: "absolute",
            width: foregroundToBackgroundHorizontalRatio + "%",
            top: foregroundToBackgroundVerticalRatio + "%",
            left: "50%",
            transition: "transform 0.5s",
          }}
        />
      </div>
      <IntroText {...get_intro_text(scrollInfo.scrollYAbsolute)} />
      {/* <div style={{ height: "200vh", background: "rgba(0,0,0,100)" }}></div> */}
    </div>
  );
}
