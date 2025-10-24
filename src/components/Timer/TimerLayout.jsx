import React, { useEffect, useState, useRef } from "react";
import { Box, Stack, Button, Tabs, Tab, Snackbar } from "@mui/material";
import useSound from "use-sound";
import beepSound from "../../assets/beep.mp3";
import { DemoBox, StackControls } from "../Stopwatch/StyledComponent";
import StartStopButton from "../Stopwatch/StartStopButton";
import ResetButton from "../Stopwatch/ResetButton";
import StopwatchTimer from "../StopwatchTimer";

const TimerLayout = ({ value, handleChange }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [open, setOpen] = useState(false);
  const intervalRef = useRef(null);

  const toggleTheme = () => setDarkMode(!darkMode);

  const Timers = [
    { label: "5 sec", value: 5000 },
    { label: "15 sec", value: 15000 },
    { label: "1 min", value: 60000 },
    { label: "10 min", value: 600000 },
    { label: "15 min", value: 900000 },
    { label: "30 min", value: 1800000 },
  ];

  const [play] = useSound(beepSound);

  // Timer logic
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 10) {
            clearInterval(intervalRef.current);
            setRunning(false);
            play();
            setOpen(true);
            return 0;
          }
          return prev - 10;
        });
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running, play]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setRunning((prev) => !prev);
      }
      if (e.code === "Backspace") {
        e.preventDefault();
        setRunning(false);
        setTime(0);
      }
    };

    addEventListener("keydown", handleKeyPress);
    return () => removeEventListener("keydown", handleKeyPress);
  }, []);

  // predefined timers
  const handleTimers = (addedTime) => setTime((time) => time + addedTime);

  return (
    <DemoBox
      sx={{
        backgroundColor: darkMode ? "#1e293b" : "#f8fafc",
        color: darkMode ? "#e2e8f0" : "#0f172a",
      }}
    >
      {/* Time ended msg */}
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        message="⏰ Time Ended!"
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />

      {/* Light/Dark Toggle */}
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
            mx: "auto",
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
              width: "100%",
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

        {/* Predefined Timers */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            justifyContent: "center",
            mb: 4,
          }}
        >
          {Timers.map((t, i) => (
            <Button
              key={i}
              variant="contained"
              onClick={() => handleTimers(t.value)}
              sx={{
                height: 40,
                backgroundColor: "#38bdf8",
                "&:hover": { backgroundColor: "#0ea5e9" },
                textTransform: "none",
              }}
            >
              {t.label}
            </Button>
          ))}
        </Box>

        {/* Timer */}
        <StopwatchTimer time={time} darkMode={darkMode} />

        {/* Controls */}
        <StackControls
          direction="row"
          spacing={2}
          sx={{ mt: { xs: 5, sm: 4, md: 3 }, width: "100%" }}
        >
          <StartStopButton
            running={running}
            onStart={() => setRunning(true)}
            onStop={() => setRunning(false)}
            sx={{ width: "50%" }}
          />
          <ResetButton
            onReset={() => {
              setRunning(false);
              setTime(0);
            }}
            sx={{ width: "50%" }}
          />
        </StackControls>
      </Stack>
    </DemoBox>
  );
};

export default TimerLayout;
