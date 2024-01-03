import React from "react";

const TwoColumnLayout = ({ leftChildren, rightChildren }) => (
  <div className="flex flex-col justify-between  md:flex-row md:justify-between">
    <div className="md:w-2/5 w-full">{leftChildren}</div>
    <div className="md:w-2/5 w-full min-h-screen">{rightChildren}</div>
  </div>
);

export default TwoColumnLayout;
