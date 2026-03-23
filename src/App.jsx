import React from "react";
import CtrlPanel from "./ctrls.jsx";
import Bg from "./bg.jsx";
import "./editmode.css";

const App = () => {
  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <filter id="ca-glass">
          <feColorMatrix in="SourceGraphic" type="matrix" result="red" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          <feOffset in="red" dx="4" dy="0" result="red_shifted" />
          <feColorMatrix in="SourceGraphic" type="matrix" result="green" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" />
          <feColorMatrix in="SourceGraphic" type="matrix" result="blue" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
          <feOffset in="blue" dx="-4" dy="0" result="blue_shifted" />
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