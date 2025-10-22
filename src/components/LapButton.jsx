import React from "react";
import {
 Buttons
} from "./StyledComponent";

const LapButton = ({onLap}) => {

  return (
    <>
      <Buttons
        onClick={onLap}  
        variant="contained"
        sx={{ 
          width: { xs: 140, sm: 120, md: 150 },
          ml:0
        }}
      >
        Lap
      </Buttons>
      

    </>
  );
};

export default LapButton;
