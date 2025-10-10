import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Stack } from "@mui/material";
import StartButton from "./StartButton";
import StopButton from "./StopButton";
import LapButton from "./LapButton";
import ResetButton from "./ResetButton";

const MainLayout = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60000);
    const seconds = Math.floor((t % 60000) / 1000);
    const milliseconds = Math.floor((t % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#707070",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "90%", md: "70%", lg: "70%" },
          maxWidth: 1000,
          height: 570,
          borderRadius: 1,
          bgcolor: "black",
          boxShadow: 3,
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Stopwatch Time */}
        <Box
          sx={{
            width: "80%",
            height: { xs: 60, sm: 80, md: 100 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
             mt: { xs: 8, sm: 10, md: 12 },
            borderRadius: 1,
            outline: 7,
            outlineColor: "#f40006",
            mx: " auto",
             boxShadow: "0 0 45px 17px #f40006", 
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "28px", sm: "40px", md: "50px" },
              fontWeight: 600,
              color: "#f40006",
            }}
          >
            {formatTime(time)}
          </Typography>
        </Box>

        {/* Controls */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: 5, sm: 7 },
          }}
        >
          <StartButton onStart={() => setRunning(true)} />
          <StopButton onStop={() => setRunning(false)} />
          <LapButton onLap={() => setLaps((prevLaps) => [...prevLaps, time])} />
          <ResetButton
            onReset={() => {
              setRunning(false);
              setTime(0);
            }}
          />
        </Stack>

    {/* laps list */}
        <Box
          sx={{
           mt: { xs: 3, sm: 4 },
            textAlign: "center",
            color: "#808080",
            overflow: "auto",
           maxHeight: { xs: 150, sm: 200 },
            width: "100%",
            mx:"auto"
          }}
        >
          {laps.map((lapTime, index) => (
            <Typography key={index}>
              Lap {index + 1}: {formatTime(lapTime)}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
