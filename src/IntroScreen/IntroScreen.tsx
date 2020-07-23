import React, { useEffect } from "react";
import useWindowSize from "./useWindowSize.hook";
import { interpolate } from "gsap/all";
import IntroText from "./IntroText";
import { between } from "../Utils/utils";

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
  if (cached_activation_obj == undefined) {
    for (let index = 0; index < scroll_activations.length; index++) {
      const { scrollRange } = scroll_activations[index];
      if (between(scroll_y, scrollRange[0], scrollRange[1])) {
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
    (scroll_y - scrollRange[0]) / (scrollRange[1] - scrollRange[0]);
  console.log(interpolation_value, scrollRange);
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
  return { transform: foregroundTransform };
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
  return { left: backgroundLeftMargin };
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
  if (win_dim.height != undefined) {
    img_width = win_dim.height * (1080 / 564);
  }

  const scroll_activations = [
    {
      scrollRange: [0, 700],
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
      scrollRange: [700, 750],
      backgroundTransformation: [
        get_background_left_margin(BackgroundPosition.HalfLeft, win_dim),
        get_background_left_margin(BackgroundPosition.Center, win_dim),
      ],
      foregroundTransformation: [
        get_foreground_transform(GogglePos.On),
        get_foreground_transform(GogglePos.Out),
      ],
    },
    {
      scrollRange: [750, 800],
      backgroundTransformation: [
        get_background_left_margin(BackgroundPosition.Center, win_dim),
        get_background_left_margin(BackgroundPosition.Center, win_dim),
      ],
      foregroundTransformation: [
        get_foreground_transform(GogglePos.Out),
        get_foreground_transform(GogglePos.Out),
      ],
    },
    {
      scrollRange: [800, 900],
      backgroundTransformation: [
        get_background_left_margin(BackgroundPosition.Center, win_dim),
        get_background_left_margin(BackgroundPosition.Center, win_dim),
      ],
      foregroundTransformation: [
        get_foreground_transform(GogglePos.Out),
        get_foreground_transform(GogglePos.Down),
      ],
    },
    {
      scrollRange: [900, 1000],
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
      scrollRange: [1000, 1100],
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
      scrollRange: [1100, 1200],
      backgroundTransformation: [
        get_background_left_margin(BackgroundPosition.Center, win_dim),
        get_background_left_margin(BackgroundPosition.Center, win_dim),
      ],
      foregroundTransformation: [
        get_foreground_transform(GogglePos.Up),
        get_foreground_transform(GogglePos.Out),
      ],
    },
    {
      scrollRange: [1100, 12000],
      backgroundTransformation: [
        get_background_left_margin(BackgroundPosition.Center, win_dim),
        get_background_left_margin(BackgroundPosition.Center, win_dim),
      ],
      foregroundTransformation: [
        get_foreground_transform(GogglePos.Out),
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
  // console.log(scrollY, backgroundTransformation, foregroundTransformation);

  return (
    <div style={{ background: "gray", height: "200vh" }}>
      <div
        style={{
          ...backgroundTransformation,
          position: "absolute",
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
            ...foregroundTransformation,

            position: "absolute",
            width: foregroundToBackgroundHorizontalRatio + "%",
            top: foregroundToBackgroundVerticalRatio + "%",
            left: "50%",
            transition: "transform 2s",
          }}
        />
      </div>
    </div>
  );
}
