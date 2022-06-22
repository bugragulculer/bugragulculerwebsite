import React, { useState } from "react";
import Lottie from "react-lottie";

const LottieIcon = ({ icon, size }) => {
  const [play, setPlay] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: icon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <span
      className="sidebar__icon"
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
      //style={{
      //  margin: "0",
      //  padding: "0",
      //  width: "32px",
      //  height: "32px",
      //  display: "flex",
      //  alignItems: "center",
      //  justifyContent: "center",
      //  zIndex: 5,
      //}}
    >
      <Lottie
        options={defaultOptions}
        height={size}
        width={size}
        isPaused={!play}
        isStopped={!play}
      />
    </span>
  );
};

export default LottieIcon;
