import React, { useEffect, useState, useRef } from "react";
import { Box, Stack, Button, Tabs, Tab } from "@mui/material";
import LapButton from "./LapButton";
import ResetButton from "./ResetButton";
import StartStopButton from "./StartStopButton";
import {
  DemoBox,
  StackControls,
  LapsBox,
  LapTypography,
  LapIndex,
  LapMilliseconds,
} from "../Stopwatch/StyledComponent";
import StopwatchTimer from "../StopwatchTimer";
import { formatTime, millisecond } from "../../common/FormatTime";

const MainLayout = ({ value, handleChange }) => {
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

      <Stack direction="column">
        {/* Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 8,
            mb: { xs: 5, sm: 4, md: 3 },
            width: "100%",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Stopwatch and Timer Tabs"
            variant="fullWidth"
            sx={{
              width: { xs: "100%", sm: "100%", md: "100%" },
              backgroundColor: darkMode ? "#0f172a" : "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              "& .MuiTabs-indicator": {
                backgroundColor: "#38bdf8",
                height: "3px",
              },
              "& .MuiTab-root": {
                color: darkMode ? "#e2e8f0" : "#0f172a",
                fontWeight: 600,
                textTransform: "none",
              },
              "& .Mui-selected": {
                color: "#38bdf8",
              },
            }}
          >
            <Tab value="MainLayout" label="Stopwatch" />
            <Tab value="TimerLayout" label="Timer" />
          </Tabs>
        </Box>

        {/* Timer */}
        <StopwatchTimer time={time} darkMode={darkMode} />

        {/* Controls */}
        <StackControls
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: { xs: 5, sm: 4, md: 3 } }}
        >
          <StartStopButton
            running={running}
            onStart={() => setRunning(true)}
            onStop={() => setRunning(false)}
            sx={{ width: { xs: 340, sm: 200, md: 190 } }}
          />
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <LapButton onLap={() => setLaps((prev) => [...prev, time])} />
            <ResetButton
              onReset={() => {
                setRunning(false);
                setTime(0);
                setLaps([]);
                savedTimeRef.current = 0;
              }}
              sx={{ width: { xs: 160, sm: 120, md: 150 } }}
            />
          </Stack>
        </StackControls>

        {/* Laps List */}
        <LapsBox
          darkMode={darkMode}
          sx={{
            mt: { xs: 5, sm: 4, md: 3 },
            mx: "auto",
            p: { xs: 2, sm: 6, md: 4 },
            maxHeight: { xs: 180, sm: 200 },
            width: { xs: "100%", sm: "100%", md: "100%" },
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
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
