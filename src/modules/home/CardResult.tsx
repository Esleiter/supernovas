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
import { RequiredProfile, ResponseIA } from "../interface/types";
import { useFormik } from "formik";
import { useSaveData } from "../../services/useSaveData";
import { useNavigate } from "react-router-dom";

type Props = { data: ResponseIA };

const CardResult = ({ data }: Props) => {
  const { save, isLoading } = useSaveData();
  const navigate = useNavigate();
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      budget: data?.budget ?? "",
      duration: data?.duration ?? "",
      country: data?.client?.location?.country ?? "",
    },
    //   validationSchema: loginSchema,
    onSubmit: async ({ budget, duration, country }) => {
      console.log(budget, duration);
      data.budget = budget;
      data.duration = duration;
      data.client.location.country = country;
      const resp = await save("projects", data);
      navigate(`/projects/${resp.id}`);
    },
  });

  const dataSkills = (data: RequiredProfile[]) => {
    let arr: string[] = [];
    data.forEach((element) => {
      arr.push(...element.skills);
    });
    return arr.reduce((acc: string[], item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
  };

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <Box sx={{ p: 2 }} component={"form"} onSubmit={handleSubmit}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography gutterBottom variant="h5" component="div">
            Datos relevantes
          </Typography>
        </Stack>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Item
            title="Perfiles para el proyecto"
            options={data?.requiredProfiles?.map((item) => item?.profileTitle)}
          />
          <Item title="Tecnologías" options={data?.scope} />
          <Item
            title="Skills necesarias"
            options={dataSkills(data.requiredProfiles)}
          />
          <Grid container item>
            <Grid item xs={6} paddingRight={1}>
              <Box sx={{ marginTop: 2 }}>
                <Typography gutterBottom variant="body2">
                  Presupuesto
                </Typography>
                <Stack direction="row" spacing={1}>
                  <TextField
                    id="budget"
                    fullWidth
                    autoFocus
                    value={values?.budget}
                    style={{ marginTop: 10 }}
                    onChange={handleChange}
                  />
                </Stack>
              </Box>
            </Grid>

            <Grid xs={6}>
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Duración
                </Typography>
                <Stack direction="row" spacing={1}>
                  <TextField
                    id="duration"
                    fullWidth
                    autoFocus
                    value={values?.duration}
                    style={{ marginTop: 10 }}
                    onChange={handleChange}
                  />
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Stack direction="column">
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2" gutterBottom>
                Ubicación
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  id="country"
                  fullWidth
                  autoFocus
                  value={values?.country}
                  style={{ marginTop: 10 }}
                  onChange={handleChange}
                />
              </Stack>
            </Box>
          </Stack>

          <Stack direction="column">
            <Grid container justifyContent={"center"} marginTop={6}>
              <Button variant="contained" type="submit" disabled={isLoading}>
                Guardar
              </Button>
            </Grid>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
};

export default CardResult;
