import React from "react";
import {
 Buttons
} from "./StyledComponent";

const ResetButton = ({onReset}) => {

  return (
    <>
      <Buttons
       onClick={onReset}
        variant="contained"
        sx={{ 
           width: { xs: 160, sm: 120, md: 150 },
        }}
      >
        Reset
      </Buttons>
    </>
  );
};

export default ResetButton;
