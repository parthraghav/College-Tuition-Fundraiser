import React from "react";
import { ScrollProvider } from "@foo-software/react-scroll-context";

// replace `scroll-context` any name you like.
const Context = React.createContext("scroll-context");

export { ScrollProvider, Context };
