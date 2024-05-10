import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import Item from "./Item";
import { useEffect, useState } from "react";
import { ResponseIA } from "../interface/types";

const CardResult: React.FC<ResponseIA> = ({
  budget,
  client,
  developer,
  duration,
  requirements,
}) => {
  const [countryValue, setCountryValue] = useState("");
  const [budgetValue, setBudgetValue] = useState("");
  const [durationValue, setDurationValue] = useState("");
  useEffect(() => {
    setCountryValue(client.location.country);
    setBudgetValue(budget);
    setDurationValue(duration);
    // countryValue;
  }, [budget, client, developer, duration, requirements]);

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography gutterBottom variant="h5" component="div">
            Datos relevantes
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Item
          title="Requerimentos de experiencia"
          options={requirements.requiredExperience}
        />
        <Item title="Tecnologias" options={requirements.technologies} />
        <Item title="Skill" options={developer.skills} />

        <Stack direction="column">
          <Box sx={{ marginTop: 2 }}>
            <Typography gutterBottom variant="body2">
              Presupuesto
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                id="budget"
                fullWidth
                autoFocus
                value={budgetValue}
                style={{ marginTop: 10 }}
                onChange={(e) => setBudgetValue(e.target.value)}
              />
            </Stack>
          </Box>
        </Stack>

        <Stack direction="column">
          <Box sx={{ typography: "body1", marginTop: 2 }}>
            <Typography variant="body1" gutterBottom>
              Duración:
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                id="duration"
                fullWidth
                autoFocus
                value={durationValue}
                style={{ marginTop: 10 }}
                onChange={(e) => setDurationValue(e.target.value)}
              />
            </Stack>
          </Box>
        </Stack>

        <Stack direction="column">
          <Box sx={{ typography: "body1", marginTop: 2 }}>
            <Typography variant="body1" gutterBottom>
              Ubicación
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                id="country"
                fullWidth
                autoFocus
                value={countryValue}
                style={{ marginTop: 10 }}
                onChange={(e) => setCountryValue(e.target.value)}
              />
            </Stack>
          </Box>
        </Stack>

        <Stack direction="column">
          <Grid container justifyContent={"center"} marginTop={6}>
            <Button variant="contained" type="submit">
              Enviar
            </Button>
          </Grid>
        </Stack>
      </Box>
    </Card>
  );
};

export default CardResult;
