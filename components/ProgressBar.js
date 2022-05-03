import React, { Component } from "react";
import { Button, Progress } from "semantic-ui-react";

const ProgressBar = (props) => {
  const getPercent = () => {
    return ((props.balance / props.goal) * 100).toFixed(4);
  };
  return (
    <div>
      <Progress percent={getPercent()} indicating />
      <p>{`Goal reached: ${getPercent()}%`}</p>
    </div>
  );
};

export default ProgressBar;
