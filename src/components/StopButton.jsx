import {
 Buttons
} from "./StyledComponent";
import React from "react";

const StopButton = ({onStop}) => {
  return (
    <>
      <Buttons
        onClick={onStop}
        variant="contained"
        sx={{ 
           width: { xs: 100, sm: 120, md: 140 },
        }}
      >
        Stop
      </Buttons>
    </>
  );
};

export default StopButton;
