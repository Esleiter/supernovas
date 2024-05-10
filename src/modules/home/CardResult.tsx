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
import { ResponseIA } from "../interface/types";
import { useFormik } from "formik";

const CardResult: React.FC<ResponseIA> = ({
  budget,
  client,
  developer,
  duration,
  requirements,
}) => {
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      budget: budget,
      duration: duration,
      country: client.location.country,
    },
    onSubmit: async ({ budget, duration, country }) => {
      const proyect = {
        client: {
          name: null,
          industry: "Logística",
          location: {
            city: "Ciudad de México",
            country: country,
          },
        },
        duration: duration,
        budget: budget,
        scope: [],
        requiredProfiles: [
          {
            profileTitle: "Desarrolladores Full-stack",
            skills: developer.skills,
          },
        ],
      };
      console.log(proyect)
    },
  });

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <Box component="form" padding={2} noValidate onSubmit={handleSubmit}>
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
                  value={values.budget}
                  style={{ marginTop: 10 }}
                  onChange={handleChange}
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
                  value={values.duration}
                  style={{ marginTop: 10 }}
                  onChange={handleChange}
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
                  value={values.country}
                  style={{ marginTop: 10 }}
                  onChange={handleChange}
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
      </Box>
    </Card>
  );
};

export default CardResult;
