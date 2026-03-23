import React from "react";
import CtrlPanel from "./ctrls.jsx";
import Bg from "./bg.jsx";
import "./editmode.css";

const App = () => {
  return (
    <>
      <svg style={{ position: "absolute", visibility: "hidden", pointerEvents: "none" }} aria-hidden="true">
        <filter id="ca-glass" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" edgeMode="duplicate" result="blurred" />
          <feColorMatrix in="blurred" type="matrix" result="red" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          <feConvolveMatrix in="red" order="15 1" kernelMatrix="0 0 0 0 0 0 0 0 0 0 0 0 0 0 1" edgeMode="duplicate" result="red_shifted" />
          <feColorMatrix in="blurred" type="matrix" result="green" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          <feColorMatrix in="blurred" type="matrix" result="blue" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          <feConvolveMatrix in="blue" order="15 1" kernelMatrix="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0" edgeMode="duplicate" result="blue_shifted" />
          <feBlend mode="screen" in="red_shifted" in2="green" result="rg" />
          <feBlend mode="screen" in="rg" in2="blue_shifted" result="rgb" />
        </filter>
      </svg>
      <Bg />
      <CtrlPanel />
    </>
  );
};

export default App;