import React from "react";
import { Buttons } from "./StyledComponent";

const StartStopButton = ({ running, onStart, onStop }) => {

  return (
    <Buttons
      onClick={running ? onStop : onStart}
      variant="contained"
      sx={{
        width: { xs: 300, sm: 120, md: 180 },
        backgroundColor: running ? "#F54545" : "#43a047", 
        "&:hover": {
          backgroundColor: running ? "#c62828" : "#2e7d32",
        },
      }}
    >
      {running ? "Stop" : "Start"}
    </Buttons>
  );
};

export default StartStopButton;
