import React from "react";
import { Box } from "@mui/material";
import {
  DemoPaper,
  StopwatchBox,
  StopwatchTypography,
  MillisecondTypography,
} from "../components/Stopwatch/StyledComponent";
import { formatTime,millisecond } from "../common/FormatTime";

const StopwatchTimer = ({ time, darkMode }) => {
    


  return (
    <DemoPaper
      square={false}
      sx={{
        p: { xs: 6, sm: 3, md: 4 },
        backgroundColor: darkMode ? "#0f172a" : "#ffffff",
        color: darkMode ? "#e2e8f0" : "#0f172a",
      }}
    >
      <StopwatchBox
        sx={{
          width: { xs: "90%", sm: "80%", md: "70%" },
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <StopwatchTypography
            sx={{ fontSize: { xs: "60px", sm: "100px", md: "130px" } }}
          >
            {formatTime(time)}
          </StopwatchTypography>
          <MillisecondTypography
            sx={{ fontSize: { xs: "40px", sm: "50px", md: "50px" } }}
          >
            {millisecond(time)}
          </MillisecondTypography>
        </Box>
      </StopwatchBox>
    </DemoPaper>
  );
};

export default StopwatchTimer;
