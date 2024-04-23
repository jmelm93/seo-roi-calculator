import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Tooltip,
  IconButton,
  InputAdornment,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import seoBsForecastCalculator, {
  RevenueImpactResult,
} from "./seoBsForecastCalculator";
import ReadMore from "./ReadMore";
import { fCurrency } from "../../utils/formatNumber";
import { mockData, introText, Field, fields } from "./data";

type State = {
  current_traffic: number;
  max_traffic: number;
  change_type: string;
  impact_range_min: number;
  impact_range_max: number;
  est_cvr: number;
  est_conv_value: number;
};

const initialState: State = {
  current_traffic: 50000,
  max_traffic: 120000,
  change_type: "Positive",
  impact_range_min: 35,
  impact_range_max: 50,
  est_cvr: 2.0,
  est_conv_value: 50,
};

const ImpactCalculator = () => {
  const [formValues, setFormValues] = useState<State>(initialState);
  const [result, setResult] = useState<RevenueImpactResult | null>(mockData);

  const handleInputChange = (id: string, value: number | string) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleCalculate = () => {
    const calculatedResult = seoBsForecastCalculator({
      currentTraffic: formValues.current_traffic,
      maxTraffic: formValues.max_traffic,
      changeType: formValues.change_type as "Positive" | "Negative",
      impactRange: [formValues.impact_range_min, formValues.impact_range_max],
      estCvr: formValues.est_cvr,
      estConvValue: formValues.est_conv_value,
    });
    setResult(calculatedResult);
  };

  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h3" gutterBottom>
        SEO Revenue Impact Estimator
      </Typography>
      <ReadMore text={introText} charLimit={325} />

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Inputs
          </Typography>
          <Grid container spacing={2}>
            {fields.map((field: Field) => (
              <Grid item xs={12} sm={6} md={3} key={field.id}>
                {field.type === "select" ? (
                  <TextField
                    select
                    label={field.label}
                    value={formValues[field.id as keyof State]}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value)
                    }
                    fullWidth
                    margin="normal"
                    SelectProps={{
                      native: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={field.tooltip}>
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    type={field.type}
                    label={field.label}
                    value={formValues[field.id as keyof State]}
                    onChange={(e) =>
                      handleInputChange(field.id, Number(e.target.value))
                    }
                    fullWidth
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={field.tooltip}>
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            onClick={handleCalculate}
            sx={{ mt: 2, width: "100%" }}
          >
            Calculate
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card variant="outlined" sx={{ backgroundColor: "#FAFAFA" }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Results
            </Typography>
            <Typography variant="h5" gutterBottom>
              Estimated Monthly Revenue Impact:
            </Typography>
            <Typography sx={{ fontFamily: "monospace", mb: 2 }}>
              {fCurrency(result.revenueImpactRange[0])} to{" "}
              {fCurrency(result.revenueImpactRange[1])}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Explanation:
            </Typography>
            <Typography
              sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
            >
              {result.explanation}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ImpactCalculator;
