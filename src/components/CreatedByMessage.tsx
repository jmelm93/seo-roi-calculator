import React from "react";
import Typography from "@mui/material/Typography";

const CreatedByMessage = () => (
  <Typography variant="subtitle1" marginBottom={2}>
    Created by{" "}
    <a
      href="https://www.linkedin.com/in/jason-melman-541076a8/"
      target="_blank"
      rel="noreferrer"
    >
      Jason Melman
    </a>
  </Typography>
);

export default CreatedByMessage;
