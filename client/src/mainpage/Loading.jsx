import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
export default function Loading(props) {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        paddingTop: "2px",
        paddingLeft: "2px",
      }}
    >
      {props.buffer < 3 ? (
        <CircularProgress size={20} variant="indeterminate" />
      ) : (
        <div></div>
      )}
      <div className="connected">{props.buffer < 3 ? "Connected" : ""}</div>
      <div className="disconnected">
        {props.buffer < 3
          ? ""
          : "Connection lost. Please wait" + ".".repeat(props.buffer % 4)}
      </div>
    </Box>
  );
}
