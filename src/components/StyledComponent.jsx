import { styled } from "@mui/material/styles";
import { Box, Typography, Paper, Button, Stack } from "@mui/material";

export const DemoBox = styled(Box)(() => ({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1e293b",
}));

export const DemoPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 800,
  height: 470,
  backgroundColor: "#0f172a",
  boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.2)",
  ...theme.typography.body2,
  textAlign: "center",
}));

export const StopwatchTypography = styled(Typography)(() => ({
  color: "#e2e8f0",
}));

export const LapsBox = styled(Box)(() => ({
  textAlign: "center",
  color: "#e2e8f0",
  overflowY: "auto",
  width: "100%",
  mx: "auto",
  height: 160,
  scrollbarWidth: "none",
}));

export const Buttons = styled(Button)(() => ({
  backgroundColor: "#38bdf8",
  fontWeight: 600,
  fontSize: "18px",
  "&:hover": {
    backgroundColor: "#1e293b",
  },
}));

export const StopwatchBox = styled(Box)(() => ({
  display: "inline-block",
  fontFamily: "monospace",
  textAlign: "center",
  mx: "auto",
}));

export const LapTypography = styled(Typography)(() => ({
  fontSize: "22px",
  fontWeight: 400,
  color: "#e2e8f0",
  marginBottom: "2px",
}));

export const LapMilliseconds = styled("span")(() => ({
  fontSize: "14px",
  opacity: 0.6,
  marginLeft: "4px",
}));

export const LapIndex = styled("span")(() => ({
  fontWeight: 600,
  color: "#ffffff",
  marginRight: "8px",
}));

export const StackControls = styled(Stack)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mx: "auto",
}));

export const MillisecondTypography = styled(Typography)(() => ({
  ml: 2,
  lineHeight: 1,
  opacity: 0.5,
  color: "#e2e8f0",
}));
