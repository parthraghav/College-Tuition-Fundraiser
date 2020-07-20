import React, { Component } from "react";

function SocialIcon(props: any) {
  return (
    <div>
      <a href="">
        <div
          style={{
            background: `url(${props.url})`,
            width: "2em",
            height: "2em",
            backgroundSize: "contain",
            display: "inline-block",
            margin: "0.2em",
          }}
        />
      </a>
    </div>
  );
}

interface SocialShareBannerState {}

const SocialIconUrls = [
  {
    name: "Snapchat",
    url:
      "https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2Fsocial-2bb5aebebca42c2e008fde196a1a9e0c87da390b.png?alt=media",
  },
  {
    name: "Instagram",
    url:
      "https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2Fsocial-37dfe829a987169e81c4fafb7ae68fbe8a480462.png?alt=media",
  },
  {
    name: "Facebook",
    url:
      "https://firebasestorage.googleapis.com/v0/b/parthraghav-com.appspot.com/o/fund%2Fstatic%2Fsocial-65240092171b68e5a5674209c23d48c4ace02562.png?alt=media",
  },
  {
    name: "Twitter",
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
    return (
      <div
        style={{
          position: "fixed",
          height: "16%",
          minHeight: "100px",
          bottom: this.props.hidden ? "-16%" : 0,
          padding: "0em 1em",
          left: 0,
          right: 0,
          color: "#000000",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          transition: "bottom 1s",
          backgroundColor: "#F4F1EF",
          borderTop: "1px solid #CECECE",
        }}
      >
        <div style={{ display: "flex", flex: 0, height: "100%" }}>
          <div
            style={{
              flexBasis: 2,
              display: "flex",
              flexGrow: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ padding: 10 }}>
              <h3 style={{ margin: 0 }}>Share</h3>
              <p style={{ margin: 0 }}>
                the campaign with your friends and family
              </p>
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
              <SocialIcon url={icon.url} name={icon.name} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
