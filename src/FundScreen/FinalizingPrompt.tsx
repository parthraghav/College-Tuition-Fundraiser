import React, { useState, useRef, useEffect } from "react";
import { TimelineLite, TweenMax, Power3 } from "gsap";
import "./styles.css";
import CircularLoader from "./CircularLoader";

function SubmitButton(props: any) {
  return (
    <div
      onClick={() => props.onSubmit()}
      style={{
        background: props.isTextBoxEmpty
          ? "linear-gradient(0deg,#00AC17,#4BC25C)"
          : "linear-gradient(0deg,#4B89F6,#2E7AFF)",
        transform: props.focused ? "scale(0.9,0.9)" : "scale(1,1)",
        transition: "transform 0.4s",
        padding: "0px 20px",
        borderRadius: 50,
        textAlign: "center",
        margin: "20px auto",
        width: "fit-content",
        display: "block",
        placeItems: "center",
        cursor: "pointer",
        userSelect: "none",
        WebkitTapHighlightColor: "rgba(255, 0, 0, 0)",
        outline: "none",
      }}
    >
      <span style={{ color: "#FFFFFF", fontSize: "1.1em", fontWeight: 500 }}>
        {props.isTextBoxEmpty ? "Donate Anonymously" : "Continue"}
      </span>
    </div>
  );
}

export function FinalizingPrompt({ onSubmit, state }: any) {
  const [isTextBoxEmpty, setIsTextBoxEmpty] = useState(true);
  const [currentValue, setCurrentValue] = useState("");

  let outerContainerRef = useRef(null);
  let textContainerRef = useRef(null);

  let tl = new TimelineLite({ delay: 0.8 });

  function handleValueChange(evt: any) {
    setCurrentValue(evt.target.value);
    console.log(evt.target.value, evt.target.value.length);
    setIsTextBoxEmpty(evt.target.value.length == 0);
  }
  function handleValueSubmit() {
    console.log("submitting", currentValue);
    onSubmit(currentValue);
  }

  function _Thanker() {
    return (
      <div>
        <h1 style={{ margin: 0, fontSize: "4em" }}>🙏</h1>
        <h1 style={{ marginTop: "1em", fontSize: "2em" }}>Thank you!</h1>
        <p style={{ maxWidth: "80%", margin: "1em auto", lineHeight: 2 }}>
          I will write to you personally to let you know the future milestones
          of my education. Your support means the world to me, and I will make
          sure to repay your investment!
        </p>
      </div>
    );
  }

  function _ErrorNotifier() {
    return (
      <div>
        <h1 style={{ margin: 0, fontSize: "4em" }}>⚒️</h1>
        <h1 style={{ marginTop: "1em", fontSize: "2em" }}>
          Something went wrong
        </h1>
        <p style={{ maxWidth: "80%", margin: "1em auto", lineHeight: 2 }}>
          There was a network error. Please try again!
        </p>
      </div>
    );
  }

  useEffect(() => {
    const outerContainer = outerContainerRef.current;
    const textContainer = textContainerRef.current;
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
      }).from(textContainer, 0.2, {
        transform: "scale(0.3)",
        ease: Power3.easeInOut,
      });
      return () => {
        const outerContainer = outerContainerRef.current;
        const textContainer = textContainerRef.current;
        if (
          outerContainer &&
          textContainer &&
          outerContainer != null &&
          textContainer != null
        ) {
          tl.from(outerContainer, 0.2, {
            transform: "translate(0,55%) scale(0.1)",
            ease: Power3.easeIn,
          }).from(textContainer, 0.2, {
            transform: "scale(0.3)",
            ease: Power3.easeInOut,
          });
        }
      };
    }
  }, []);

  return (
    <div
      ref={outerContainerRef}
      style={{
        transition: "transform 0.1s",
        visibility: "hidden",
        position: "fixed",
        lineHeight: "3em",
        left: 0,
        top: 0,
        height: "100vh",
        width: "100vw",
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.29)",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={textContainerRef}
        style={{
          transition: "transform 0.2s",
          height: "90%",
          width: "90%",
          textAlign: "center",
          background: "white",
          borderRadius: 20,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        {state === "SUBMITTING" && (
          <div>
            <h1 style={{ margin: 0, fontSize: "2em" }}>What's your name?</h1>
            <input
              className="custom-placeholder"
              value={currentValue}
              onChange={handleValueChange}
              style={{
                outline: "0 !important",
                margin: 0,
                fontSize: "min(3em, 180%)",
                textAlign: "center",
                border: "none",
                fontWeight: "bold",
                letterSpacing: 0,
              }}
              placeholder="Enter your name"
            />
            <SubmitButton
              onSubmit={handleValueSubmit}
              isTextBoxEmpty={isTextBoxEmpty}
            />
          </div>
        )}
        {state === "WAITING" && <CircularLoader />}

        {state === "SUCCESSFUL" && <_Thanker />}
        {state === "ERROR" && <_ErrorNotifier />}
      </div>
    </div>
  );
}
