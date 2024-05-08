import {
  Box,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import Item from "../component/Item";

const Relevant = () => {
  const [year, setYear] = useState("1");
  const [month, setMonth] = useState("6");
  const [country, setCountry] = useState("México");

  const handleYear = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  const handleMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value as string);
  };

  const handleCountry = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  return (
    <Box  style={{ width: 750 }}>
      <Box sx={{ typography: "body1" }}>
        <Typography variant="h5" gutterBottom component="div">
          Datos relevantes
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ typography: "body1", marginTop: 2 }}>
            <Item title="Alcance" options={["web", "mobile", "windows"]} />

            <Box sx={{ typography: "body1", marginTop: 2 }}>
              <Typography variant="body1" gutterBottom>
                Presupuesto
              </Typography>

                <TextField
                  id="presupuesto"
                  fullWidth
                  autoFocus
                  value="$ 200,000.00"
                />

              <Box sx={{ typography: "body1", marginTop: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Duración: año/mes
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Select
                    labelId="select-year-label"
                    id="select-year"
                    value={year}
                    onChange={handleYear}
                    style={{ width: '48%' }}
                  >
                    <MenuItem value={1}>0</MenuItem>
                    <MenuItem value={2}>1</MenuItem>
                    <MenuItem value={3}>2</MenuItem>
                  </Select>

                  <Select
                    labelId="select-month-label"
                    id="select-month"
                    value={month}
                    onChange={handleMonth}
                    style={{ width: '48%' }}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Item title="Perfiles" options={["Front end", "Backend", "PM"]} />
          <Item title="Skill" options={["Vue", "Liderazgo"]} />

          <Box sx={{ typography: "body1", marginTop: 2 }}>
            <Typography variant="body1" gutterBottom>
              Ubicación
            </Typography>
            <Box style={{ display: "flex" }}>
              <Select
                labelId="select-month-label"
                id="select-month"
                value={country}
                onChange={handleCountry}
                style={{ width: '100%' }}
              >
                <MenuItem value={"México"}>México</MenuItem>
                <MenuItem value={"Colombia"}>Colombia</MenuItem>
                <MenuItem value={"Ecuador"}>Ecuador</MenuItem>
              </Select>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} marginTop={6}>
        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </Grid>
    </Box>
  );
};

export default Relevant;
