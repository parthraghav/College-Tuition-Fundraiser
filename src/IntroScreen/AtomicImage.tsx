import React, { Component } from "react";

interface AtomicImageState {
  dimensions: {
    width: number;
    height: number;
  };
}

export default class AtomicImage extends Component<any, AtomicImageState> {
  constructor(props: any) {
    super(props);
    this.state = { dimensions: { width: 0, height: 0 } };
    this.onImgLoad = this.onImgLoad.bind(this);
  }
  onImgLoad({ target: img }: any) {
    this.setState({
      dimensions: { height: img.offsetHeight, width: img.offsetWidth },
    });
  }
  render() {
    const { src, style, position_inferer, children } = this.props;
    const { width, height } = this.state.dimensions;
    const position_style: any = position_inferer(width, height);
    console.log(position_style);

    return (
      <div style={{ ...style, ...position_style }}>
        <img
          onLoad={this.onImgLoad}
          src={src}
          style={
            style.height != null ? { height: 100 + "%" } : { width: 100 + "%" }
          }
        />
        <div
          style={{
            position: "relative",
            ...position_style,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}
