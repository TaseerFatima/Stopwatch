import { styled } from "@mui/material/styles";
import { Box, Typography, Paper, Button, Stack } from "@mui/material";

export const DemoBox = styled(Box)(() => ({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const DemoPaper = styled(Paper)(() => ({
  maxWidth: 800,
  maxHeight: 180,
  textAlign: "center",
}));

export const StopwatchTypography = styled(Typography)(() => ({
  fontFamily: "monospace",
  lineHeight: 1,
}));
export const LapsBox = styled(Box)(() => ({
  display:"grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap:22,
  overflowY: "auto",
  padding:12,
  height: 180,
  scrollbarWidth: "none",
  boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
 border: "1px solid rgba(255,255,255,0.1)",
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
  margin: "auto",
}));

export const LapTypography = styled(Typography)(() => ({
  fontSize: "26px",
  fontWeight: 500,
  // color: "#e2e8f0",
  marginBottom: "2px",
}));

export const LapMilliseconds = styled("span")(() => ({
  fontSize: "14px",
  opacity: 0.6,
  marginLeft: "4px",
}));

export const LapIndex = styled("span")(() => ({
  fontWeight: 800,
  marginRight: "8px",
}));

export const StackControls = styled(Stack)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
}));

export const MillisecondTypography = styled(Typography)(() => ({
  ml: 2,
  lineHeight: 1,
  opacity: 0.5,
}));
