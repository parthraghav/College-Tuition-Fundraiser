// Adapted for Typescript
// Forked from https://github.com/foo-software/react-scroll-context/blob/master/src/ScrollProvider.js

import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

const throttle = (fn: Function, wait: number) => {
  let time = Date.now();
  return function throttle() {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
};

const ScrollContext = React.createContext({
  isScrollingDown: true,
  scrollX: 0,
  scrollY: 0,
});

const ScrollConsumer = ScrollContext.Consumer;

const ScrollProvider = ({
  children,
  scrollContainerRef,
  throttleTime,
}: any) => {
  // `useRef` instead of `useState` to persist scroll state without re-render
  const isScrollingDown = useRef(false);
  const scrollX = useRef(0);
  const scrollY = useRef(0);

  // trigger re-render by setting these
  const [isScrollingDownValue, setIsScrollingDownValue] = useState(false);
  const [scrollXValue, setScrollXValue] = useState(0);
  const [scrollYValue, setScrollYValue] = useState(0);

  // handle scroll
  const onScroll = throttle((scrollContainer: any) => {
    // `scrollX` for `window`, `scrollLeft` for an element
    const scrollContainerX =
      typeof scrollContainer.scrollX === "undefined"
        ? scrollContainer.scrollLeft
        : scrollContainer.scrollX;

    // `scrollY` for `window`, `scrollTop` for an element
    const scrollContainerY =
      typeof scrollContainer.scrollY === "undefined"
        ? scrollContainer.scrollTop
        : scrollContainer.scrollY;

    // if scroll has changed
    if (
      scrollContainerX !== scrollX.current ||
      scrollContainerY !== scrollY.current
    ) {
      isScrollingDown.current = scrollContainerY > scrollY.current;
      scrollX.current = scrollContainerX;
      scrollY.current = scrollContainerY;

      // trigger re-render
      setIsScrollingDownValue(isScrollingDown.current);
      setScrollXValue(scrollX.current);
      setScrollYValue(scrollY.current);
    }
  }, throttleTime);

  // by passing an empty array as the second argument for `useEffect` we are
  // imitating `componentDidMount` lifecycle method.
  useEffect(() => {
    if (typeof scrollContainerRef === "undefined") {
      return;
    }
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.current.addEventListener(
      "scroll",
      onScroll.bind(scrollContainer),
      false
    );
    return () => {
      scrollContainer.current.removeEventListener(
        "scroll",
        onScroll.bind(scrollContainer),
        false
      );
    };
  }, []);

  if (typeof scrollContainerRef === "undefined") {
    return children;
  }

  return (
    <ScrollContext.Provider
      value={{
        isScrollingDown: isScrollingDownValue,
        scrollX: scrollXValue,
        scrollY: scrollYValue,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
ScrollProvider.defaultProps = {
  throttleTime: 200,
  scrollContainer: window,
};

export { ScrollProvider, ScrollConsumer };
