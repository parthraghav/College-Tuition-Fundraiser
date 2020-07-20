import React from "react";
import QuickPayRadioButton from "./QuickPayRadioButton";

export default function QuickPaySelector(props: any) {
  return (
    <div
      style={{
        width: "100vw",
        maxWidth: "600px",
        textAlign: "center",
        margin: "0px auto",
        overflowX: "scroll",
        whiteSpace: "nowrap",
      }}
    >
      <QuickPayRadioButton emoji="🌭" label="$5" focused={true} />
      <QuickPayRadioButton emoji="☕" label="$57.5" focused={false} />
      <QuickPayRadioButton emoji="🍺" label="$10" focused={false} />
      <br />
      <QuickPayRadioButton emoji="🍿" label="$15" focused={false} />
      <QuickPayRadioButton emoji="🍰" label="$20" focused={false} />
      <QuickPayRadioButton emoji="🤖" label="$50" focused={false} />
      <QuickPayRadioButton emoji="🎄" label="$100" focused={false} />
      <br />
      <QuickPayRadioButton emoji="🦄" label="$200" focused={false} />
      <QuickPayRadioButton emoji="👁" label="$500" focused={false} />
      <QuickPayRadioButton emoji="🙏" label="$500" focused={false} />
    </div>
  );
}
