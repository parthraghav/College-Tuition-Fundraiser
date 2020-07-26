import React, { Component, useState, useRef, useEffect } from "react";
import "./styles.css";
import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
} from "react-share";
import CopyToClipboard from "react-copy-to-clipboard";
import { TimelineLite, TweenMax, Power3 } from "gsap";
import { isMobile } from "react-device-detect";

const SHAREABLE_LINK = "http://fund.parthraghav.com/";

function SocialIcon(props: any) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <props.component url={SHAREABLE_LINK} className="defocused">
      <div className="defocused">
        <div
          className="defocused"
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onPointerDown={() => setIsPressed(true)}
          onPointerUp={() => setIsPressed(false)}
          style={{
            background: `url(${props.url})`,
            width: "2em",
            height: "2em",
            backgroundSize: "contain",
            display: "inline-block",
            margin: "0.2em",
            transform: isPressed ? "scale(0.9,0.9)" : "scale(1,1)",
            transition: "transform 0.5s",
          }}
        />
      </div>
    </props.component>
  );
}

function SnapShareScreen({ setState }: any) {
  let outerContainerRef = useRef(null);
  let textContainerRef = useRef(null);

  let tl = new TimelineLite({ delay: 0.8 });

  useEffect(() => {
    const outerContainer = outerContainerRef.current;
    const textContainer = textContainerRef.current;
    console.log(outerContainer);
    const timeout = setTimeout(() => {
      setState(false);
    }, 3100);

    if (
      outerContainer &&
      textContainer &&
      outerContainer != null &&
      textContainer != null
    ) {
      TweenMax.to(outerContainer, 0, { css: { visibility: "visible" } });

      tl.from(outerContainer, 0.2, {
        transform: "translate(0,55%) scale(0.1)",
        ease: Power3.easeIn,
      })
        .from(textContainer, 0.2, {
          transform: "scale(0.3)",
          ease: Power3.easeInOut,
        })
        .to(
          textContainer,
          0.2,
          {
            transform: "scale(0.1)",
            ease: Power3.easeOut,
          },
          2
        )
        .to(
          outerContainer,
          0.2,
          {
            transform: "translate(0,55%) scale(0.1)",
            ease: Power3.easeOut,
          },
          2
        );
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [tl]);

  return (
    <div
      ref={outerContainerRef}
      style={{
        visibility: "hidden",
        position: "fixed",
        lineHeight: "3em",
        left: 0,
        top: 0,
        height: "100vh",
        width: "100vw",
        flex: 1,
        backgroundColor: "#f8ed04",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        ref={textContainerRef}
        style={{ height: "20vh", textAlign: "center" }}
      >
        <h1 style={{ margin: 0, fontSize: "4em" }}>🙏</h1>
        <h1 style={{ margin: 0 }}>Link copied!</h1>
      </div>
    </div>
  );
}

function CustomSnapchatShareButton(props: any) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div>
      {isCopied && <SnapShareScreen setState={setIsCopied} />}
      <CopyToClipboard text={SHAREABLE_LINK} onCopy={() => setIsCopied(true)}>
        {props.children}
      </CopyToClipboard>
    </div>
  );
}

function CustomInstagramShareButton(props: any) {
  return (
    <a
      href="https://www.instagram.com/p/CCxgrCSJwlD/"
      target="_blank"
      className="defocused"
    >
      {props.children}
    </a>
  );
}

interface SocialShareBannerState {}

const SocialIconUrls = [
  {
    name: "Reddit",
    component: RedditShareButton,
    url:
      "https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2Fsocial-287d9ad4f1b4aba3042c_1562906207.png?alt=media&token=bee4a1d7-60fc-4cfa-801d-f625101b58cc",
  },
  {
    name: "Snapchat",
    component: CustomSnapchatShareButton,
    url:
      "https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2Fsocial-2bb5aebebca42c2e008fde196a1a9e0c87da390b.png?alt=media",
  },
  {
    name: "Instagram",
    component: CustomInstagramShareButton,
    url:
      "https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2Fsocial-37dfe829a987169e81c4fafb7ae68fbe8a480462.png?alt=media",
  },
  {
    name: "Facebook",
    component: FacebookShareButton,
    url:
      "https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2Fsocial-65240092171b68e5a5674209c23d48c4ace02562.png?alt=media",
  },
  {
    name: "Twitter",
    component: TwitterShareButton,
    url:
      "https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2Fsocial-cdfc2b6047b3a3492a9d91463951bee3dfba66c7.png?alt=media",
  },
];

export default class SocialShareBanner extends Component<
  any,
  SocialShareBannerState
> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const isHidden = this.props.scrollInfo.scrollYPercent < 80;
    return (
      <div
        style={{
          fontSize: isMobile ? "0.9em" : "1em",
          lineHeight: isMobile ? "1.15em" : "inherit",
          position: "fixed",
          height: "16%",
          minHeight: "100px",
          bottom: isHidden ? "-16%" : 0,
          padding: "0em 1em",
          left: 0,
          right: 0,
          color: "#000000",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          transition: "bottom 1s",
          backgroundColor: "rgba(244, 241, 239, 0.98)",
          borderTop: "1px solid rgb(241, 241, 241)",
          userSelect: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 0,
            height: "100%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flexBasis: 2,
              display: "flex",
              flexGrow: 2,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <div style={{ paddingLeft: 5, paddingRight: 5 }}>
              <h3 style={{ margin: 0 }}>Share</h3>
              {true && (
                <p style={{ margin: 0 }}>
                  the campaign with your friends and family
                </p>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexBasis: 1,
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {SocialIconUrls.map((icon, index) => (
              <SocialIcon
                url={icon.url}
                name={icon.name}
                key={index}
                component={icon.component}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
