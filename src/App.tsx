import React from "react";
import ROICalculator from "./pages/ROICalculator";
import ImpactCalculator from "./pages/ImpactCalculator";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import CreatedByMessage from "./components/CreatedByMessage";
import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SEO Calculator Suite
            </Typography>
            <Button color="inherit" component={Link} to="/">
              <Stack direction="row" spacing={1} alignItems="center">
                <HomeIcon />
                <Typography>Home</Typography>
              </Stack>
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/roi-calculator" element={<ROICalculator />} />
            <Route path="/impact-calculator" element={<ImpactCalculator />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

function HomePage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Welcome to the SEO Calculator Suite
      </Typography>
      <CreatedByMessage />
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<CalculateIcon />}
          component={Link}
          to="/roi-calculator"
          sx={{ width: 300 }}
        >
          ROI Calculator
        </Button>
        <Button
          variant="contained"
          startIcon={<TrendingUpIcon />}
          component={Link}
          to="/impact-calculator"
          sx={{ width: 300 }}
        >
          Impact Calculator
        </Button>
      </Paper>
    </Box>
  );
}

export default App;
