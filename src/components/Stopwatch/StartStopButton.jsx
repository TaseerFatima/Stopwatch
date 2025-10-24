import React from "react";
import { Buttons } from "./StyledComponent";

const StartStopButton = ({ running, onStart, onStop,sx }) => {

  return (
    <Buttons
      onClick={running ? onStop : onStart}
      variant="contained"
      sx={{
        backgroundColor: running ? "#F54545" : "#43a047", 
        "&:hover": {
          backgroundColor: running ? "#c62828" : "#2e7d32",
        },...sx,
      }}
    >
      {running ? "Stop" : "Start"}
    </Buttons>
  );
};

export default StartStopButton;
