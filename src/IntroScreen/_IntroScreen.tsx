import React, { useEffect, createRef, forwardRef } from "react";
import "./styles.css";
// import * as ScrollMagic from "scrollmagic";
// import { TimelineLite, TweenMax, Power3 } from "gsap";
// import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import useWindowSize from "./useWindowSize.hook";
// ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineLite);
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";

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

  return foregroundTransform;
};

const get_background_left_margin = (
  background_pos: BackgroundPosition,
  size: any
) => {
  var backgroundLeftMargin;
  if (size.width == undefined || size.height == undefined) {
    return 0;
  }
  const img_width = size.height * (1080 / 564);
  const window_width = size.width;

  switch (background_pos) {
    case BackgroundPosition.HalfLeft:
      backgroundLeftMargin = -img_width / 2;
      break;
    case BackgroundPosition.Center:
      backgroundLeftMargin = (window_width - img_width) / 2;
      break;
  }

  return backgroundLeftMargin;
};

const IntroSequence = forwardRef(({ progress }: any, ref: any) => {
  const foregroundToBackgroundHorizontalRatio: number = 0.32203389839 * 100;
  const foregroundToBackgroundVerticalRatio: number = (210 / 551) * 100;

  const size = useWindowSize();
  let img_width: number = 0;
  if (size.height != undefined) {
    img_width = size.height * (1080 / 564);
  }

  console.log(progress);
  return (
    <div ref={ref} className="intro-screen-container">
      {/* <div
        style={{
          backgroundImage:
            'url("https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F90497836_205798060836274_1081335742664220290_n.jpg?alt=media")',
          backgroundSize: "contain",
          width: img_width,
          height: "100vh",
        }}
      /> */}

      <Timeline
        target={
          <img
            src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F90497836_205798060836274_1081335742664220290_n.jpg?alt=media"
            style={{
              position: "absolute",
              width: `${img_width}px`,
            }}
          />
        }
      >
        <Tween
          from={{
            left: get_background_left_margin(BackgroundPosition.Center, size),
          }}
          to={{
            left: get_background_left_margin(BackgroundPosition.HalfLeft, size),
          }}
        />
      </Timeline>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F1431436876.png?alt=media"
        style={{
          position: "absolute",
          width: foregroundToBackgroundHorizontalRatio + "%",
          top: foregroundToBackgroundVerticalRatio + "%",
          left: "50%",
          // transform: foregroundTransform,
          transition: "transform 2s",
        }}
      />
    </div>
  );
});

export default function IntroScreen(props: any) {
  let ref = createRef<HTMLDivElement>();

  return (
    <Controller>
      <Scene duration="1000" triggerHook="onLeave" reverse={true}>
        {(progress: any) => (
          <div style={{ height: "500vh", position: "relative" }}>
            <IntroSequence ref={ref} progress={progress} />
          </div>
        )}
      </Scene>
    </Controller>
  );
}

// export default function IntroScreen(props: any) {
// const foregroundToBackgroundHorizontalRatio: number = 0.32203389839 * 100;
// const foregroundToBackgroundVerticalRatio: number = (210 / 551) * 100;

// const size = useWindowSize();
// let img_width: number = 0;
// if (size.height != undefined) {
//   img_width = size.height * (1080 / 564);
// }

//   return (
//     <Controller>
//       <Scene triggerHook="onEnter" duration={600}>
//         {(progress: any) => (
//           <div>
//             <Timeline
//               totalProgress={progress}
//               paused
//               target={
//                 <div
//                   style={{
//                     position: "absolute",
//                     //   left: backgroundLeftMargin + "px",
//                     transition: "left 2s",
//                     overflow: "hidden",
//                   }}
//                 >
// <img
//   src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F90497836_205798060836274_1081335742664220290_n.jpg?alt=media"
//   //onLoad={() => this.set_background_pos(BackgroundPosition.HalfLeft)}
//   style={{
//     width: `${img_width}px`,
//   }}
// />
//                   <Timeline
//                     target={
// <img
//   src="https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2F1431436876.png?alt=media"
//   //onLoad={() => this.set_goggle_pos(GogglePos.On)}
//   style={{
//     position: "absolute",
//     width: foregroundToBackgroundHorizontalRatio + "%",
//     top: foregroundToBackgroundVerticalRatio + "%",
//     left: "50%",
//     // transform: foregroundTransform,
//     transition: "transform 2s",
//   }}
// />
//                     }
//                   >
//                     <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} />
//                   </Timeline>
//                 </div>
//               }
//             >
// <Tween
//   from={{
//     left: get_background_left_margin(
//       BackgroundPosition.Center,
//       size
//     ),
//   }}
//   to={{
//     left: get_background_left_margin(
//       BackgroundPosition.HalfLeft,
//       size
//     ),
//   }}
// />
//             </Timeline>
//           </div>
//         )}
//       </Scene>
//     </Controller>
//   );
// }
