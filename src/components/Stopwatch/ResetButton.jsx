import React from "react";
import { Buttons } from "./StyledComponent";

const ResetButton = ({ onReset, sx }) => {
  return (
    <>
      <Buttons
        onClick={onReset}
        variant="contained"
        sx={{
          ...sx,
        }}
      >
        Reset
      </Buttons>
    </>
  );
};

export default ResetButton;
