import React from "react";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Inputs, InputField } from "./types";
import { inputFields } from "./inputFields";

type ROIFormProps = {
  inputs: Inputs;
  setInputs: React.Dispatch<React.SetStateAction<Inputs>>;
  calculateAndSetChartData: () => void;
};

const ROIForm: React.FC<ROIFormProps> = ({
  inputs,
  setInputs,
  calculateAndSetChartData,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: type === "radio" ? value : parseFloat(value),
    }));
  };

  const groupedInputFields = Object.entries(inputFields).reduce(
    (acc: Record<string, InputField[]>, [key, value]) => {
      const group = value.group;
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push({ key, ...value });
      return acc;
    },
    {}
  );

  return (
    <Grid container spacing={3} alignItems="stretch">
      {Object.entries(groupedInputFields).map(([group, fields], index) => (
        <Grid item xs={12} sm={3} key={index} marginBottom={5}>
          <Paper
            elevation={1}
            style={{
              padding: "20px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #ccc",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {group}
            </Typography>
            {fields.map(({ key, label, type, tooltip }) => (
              <Tooltip key={key} title={tooltip} placement="top">
                <div style={{ marginBottom: "10px" }}>
                  <TextField
                    label={label}
                    variant="outlined"
                    fullWidth
                    name={key}
                    value={inputs[key]}
                    onChange={handleChange}
                    type={type}
                    sx={{ mt: "10px" }}
                  />
                </div>
              </Tooltip>
            ))}
          </Paper>
        </Grid>
      ))}
      <Grid item xs={12} sm={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={calculateAndSetChartData}
          size="large"
          sx={{ width: "100%", height: "60px", border: "1px solid #ccc" }}
        >
          Calculate
        </Button>
      </Grid>
    </Grid>
  );
};

export default ROIForm;
