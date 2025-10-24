import React, { useState } from "react";
import MainLayout from "./Stopwatch/MainLayout";
import TimerLayout from "./Timer/TimerLayout";

const Main = () => {
  const [value, setValue] = useState("MainLayout");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {value === "MainLayout" && (
        <MainLayout value={value} handleChange={handleChange} />
      )}
      {value === "TimerLayout" && (
        <TimerLayout value={value} handleChange={handleChange} />
      )}
    </>
  );
};

export default Main;
