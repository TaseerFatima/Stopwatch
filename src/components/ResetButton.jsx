import React from "react";
import Button from "@mui/material/Button";

const ResetButton = ({onReset}) => {

  return (
    <>
      <Button
       onClick={onReset}
        sx={{
          color: "#016396",
          width: { xs: 100, sm: 120, md: 140 },
          outline: 4,
          outlineColor: "#f40006",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        Reset
      </Button>
    </>
  );
};

export default ResetButton;
