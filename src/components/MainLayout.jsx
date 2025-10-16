import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Stack } from "@mui/material";
import LapButton from "./LapButton";
import ResetButton from "./ResetButton";
import StartStopButton from "./StartStopButton";
import {
  DemoBox,
  DemoPaper,
  StopwatchTypography,
  LapsBox,
  StopwatchBox,
  LapTypography,
  LapMilliseconds,
  LapIndex,
  StackControls,
  MillisecondTypography,
} from "./StyledComponent";

const MainLayout = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const startTimeRef = useRef(null);
  const savedTimeRef = useRef(0);
  const intervalRef = useRef(null);
  const lapsEndRef = useRef(null);

  //   stopwatch Time
  useEffect(() => {
    if (running) {
      startTimeRef.current = Date.now() - savedTimeRef.current;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
      savedTimeRef.current = time;
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  //   laps
  useEffect(() => {
    if (lapsEndRef.current) {
      lapsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [laps]);

  //   handle Events
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (running) {
          setRunning(false);
        } else {
          setRunning(true);
        }
      }

      if (e.code === "Enter" && running) {
        e.preventDefault();
        setLaps((prev) => [...prev, time]);
      }

      if (e.code === "Backspace") {
        e.preventDefault();
        setRunning(false);
        setTime(0);
        setLaps([]);
        savedTimeRef.current = 0;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [running, time]);

//   timeformat
  const formatTime = (t) => {
    const minutes = Math.floor(t / 60000);
    const seconds = Math.floor((t % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  const millisecond = (t) => {
    const ms = Math.floor(t % 1000);
    return `.${String(ms).padStart(3, "0")}`;
  };

  return (
    <DemoBox>
      <DemoPaper
        square={false}
        sx={{
          width: { xs: "100%", sm: "90%", md: "70%" },
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Stopwatch Time */}
        <StopwatchBox sx={{ width: { xs: "100%", sm: "90%", md: "70%" } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
            }}
          >
            <StopwatchTypography
              sx={{
                fontSize: { xs: "80px", sm: "100px", md: "130px" },
                lineHeight: 1,
              }}
            >
              {formatTime(time)}
            </StopwatchTypography>
            <MillisecondTypography
              sx={{
                fontSize: { xs: "40px", sm: "50px", md: "50px" },
              }}
            >
              {millisecond(time)}
            </MillisecondTypography>
          </Box>
        </StopwatchBox>

        {/* Controls */}
        <StackControls
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{mt: { xs: 5, sm: 4, md: 3 }}}
        >
          <StartStopButton
            running={running}
            onStart={() => setRunning(true)}
            onStop={() => setRunning(false)}
          />

          <Stack direction="row" spacing={3} sx={{ justifyContent: "center" }}>
            <LapButton
              onLap={() => setLaps((prevLaps) => [...prevLaps, time])}
            />
            <ResetButton
              onReset={() => {
                setRunning(false);
                setTime(0);
                setLaps([]);
                savedTimeRef.current = 0;
              }}
            />
          </Stack>
        </StackControls>

        {/* laps list */}
        <LapsBox
          sx={{
            mt: { xs: 6, sm: 5 },
            maxHeight: { xs: 150, sm: 200 },
          }}
        >
          {laps.map((lapTime, index) => (
            <LapTypography key={index}>
              <LapIndex>{index + 1}: </LapIndex>
              {formatTime(lapTime)}
              <LapMilliseconds>{millisecond(lapTime)}</LapMilliseconds>
            </LapTypography>
          ))}
          <Box ref={lapsEndRef} />
        </LapsBox>
      </DemoPaper>
    </DemoBox>
  );
};

export default MainLayout;
