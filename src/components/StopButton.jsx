import Button from "@mui/material/Button";
import React from "react";

const StopButton = ({onStop}) => {
  return (
    <>
      <Button
        onClick={onStop}
        sx={{
          color: "#f40006",
          width: { xs: 100, sm: 120, md: 140 },
          outline: 4,
          outlineColor: "#f40006",
          fontWeight: 600,
          fontSize: "18px",
        }}
      >
        Stop
      </Button>
    </>
  );
};

export default StopButton;
