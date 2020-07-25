import React, { useState, useEffect } from "react";
import QuickPayRadioButton from "./QuickPayRadioButton";

const quickPayOptions = [
  { emoji: "🌭", amount: 5 },
  { emoji: "☕", amount: 7.5 },
  { emoji: "🍺", amount: 10 },
  { emoji: "🍿", amount: 15 },
  { emoji: "🍰", amount: 20 },
  { emoji: "🤖", amount: 50 },
  { emoji: "🎄", amount: 100 },
  { emoji: "🦄", amount: 200 },
  { emoji: "👁", amount: 500 },
  { emoji: "🙏", amount: 750 },
];

export default function QuickPaySelector(props: any) {
  const [focusedIndex, setFocusedIndex] = useState(props.valueAmount);

  useEffect(() => {
    let optionIndex = quickPayOptions.findIndex(
      (el) => el.amount == props.valueAmount
    );
    setFocusedIndex(optionIndex);
  }, [props.valueAmount]);

  function handleRadioClick(index: number) {
    setFocusedIndex(index);
    if (index !== -1) props.onValueChange(quickPayOptions[index].amount);
  }
  return (
    <div
      style={{
        width: "100vw",
        maxWidth: "600px",
        textAlign: "center",
        margin: "0px auto",
        overflowX: "scroll",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {quickPayOptions.map(({ emoji, amount }, index) => [
        <QuickPayRadioButton
          emoji={emoji}
          amount={amount}
          index={index}
          key={index}
          focused={focusedIndex === index}
          onClick={handleRadioClick}
        />,
        (index === 2 || index === 6) && <br key={-1 * index} />,
      ])}
    </div>
  );
}
