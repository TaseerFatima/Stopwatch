import Button from "@mui/material/Button";
import React from "react";

const StartButton = ({onStart}) => {

  return (
    <>
      <Button
        onClick={onStart}
        sx={{
          color: "#008000",
          width: { xs: 100, sm: 120, md: 140 },
          outline: 4,
          outlineColor: "#f40006",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        Start
      </Button>
    </>
  );
};

export default StartButton;
