import React from "react";
import Button from "@mui/material/Button";

const LapButton = ({onLap}) => {

  return (
    <>
      <Button
        onClick={onLap}
        sx={{
          color: "#808080",
          width: { xs: 100, sm: 120, md: 140 },
          outline: 4,
          outlineColor: "#f40006",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        Lap
      </Button>
      

    </>
  );
};

export default LapButton;
