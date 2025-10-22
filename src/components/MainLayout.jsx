import React, { useEffect, useState, useRef } from "react";
import { Box, Stack, Button } from "@mui/material";
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
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode(!darkMode);

  //  Stopwatch logic
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

  //  laps
  useEffect(() => {
    if (lapsEndRef.current) {
      lapsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [laps]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setRunning((prev) => !prev);
      }
      if (e.code === "Enter") {
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

    addEventListener("keydown", handleKeyPress);
    return () => removeEventListener("keydown", handleKeyPress);
  }, [running, time]);

  //  Format time
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
    <DemoBox
      sx={{
        position: "relative",
        backgroundColor: darkMode ? "#1e293b" : "#f8fafc",
        color: darkMode ? "#e2e8f0" : "#0f172a",
      }}
    >
       {/* Light/Dark Toggle  */}
      <Button
        variant="contained"
        onClick={toggleTheme}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 2,
          backgroundColor: darkMode ? "#38bdf8" : "#0f172a",
          "&:hover": { backgroundColor: darkMode ? "#0ea5e9" : "#1e293b" },
        }}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </Button>
        <Stack direction="column" > 
      <DemoPaper
        square={false}
        sx={{
          width: { xs: "100%", sm: "100%", md: "100%" },
          height: { xs: "40%", sm: "90%", md: "100%" },
          p: { xs: 6, sm: 3, md: 4 },
          backgroundColor: darkMode ? "#0f172a" : "#ffffff",
          color: darkMode ? "#e2e8f0" : "#0f172a",
        }}
      >
        {/* Stopwatch Display */}
        <StopwatchBox sx={{ width: { xs: "100%", sm: "90%", md: "70%" } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              fontFamily: "montserrat",
            }}
          >
            <StopwatchTypography
              sx={{
                fontSize: { xs: "80px", sm: "100px", md: "130px" },
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
          </DemoPaper>
        {/* Controls */}
        <StackControls
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ mt: { xs: 5, sm: 4, md: 3 } }}
        >
          <StartStopButton
            running={running}
            onStart={() => setRunning(true)}
            onStop={() => setRunning(false)}
          />
          <Stack direction="row" spacing={3} sx={{ justifyContent: "center" }}>
            <LapButton onLap={() => setLaps((prev) => [...prev, time])} />
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

        {/* Laps List */}
        <LapsBox darkMode={darkMode}
          sx={{
            mt: { xs: 6, sm: 5 },
            mx: { xs: "auto", sm: "auto", md: 0 },
            p: { xs: 6, sm: 3, md: 4 },
            maxHeight: { xs: 150, sm: 200 },
            width: { xs: "100%", sm: "100%", md: "100%" },
            display:"grid",
            gridTemplateColumns: { xs: "1fr",sm:"repeat(2, 1fr)" , md: "repeat(3, 1fr)" }, 
             backgroundColor: darkMode ? "#0f172a" : "#ffffff",
          color: darkMode ? "#e2e8f0" : "#0f172a",
        }}
        >
          {laps.map((lapTime, index) => (
            <LapTypography key={index}>  
              <LapIndex>{index + 1}:</LapIndex>
              {formatTime(lapTime)}
              <LapMilliseconds>{millisecond(lapTime)}</LapMilliseconds>
            </LapTypography>
          ))}
          <Box ref={lapsEndRef} />
        </LapsBox>
     </Stack>
    </DemoBox>
  );
};

export default MainLayout;
