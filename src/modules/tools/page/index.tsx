import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useSaveData } from "../../../services/useSaveData";

const Tools = () => {
  const { save, isLoading } = useSaveData()
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      name: "",
      data: "",
    },
    //   validationSchema: loginSchema,
    onSubmit: async ({ name, data }) => {
      const dataJSON = JSON.parse(data)
      console.log(name, dataJSON)
      await save(name, dataJSON)
    },
  });
  return (
    <Grid container>
      <Card variant="outlined" style={{ width: "100%" }}>
        <Box component="form" padding={2} noValidate onSubmit={handleSubmit}>
          <Grid container gap={2}>
            <TextField
              id="name"
              fullWidth
              autoFocus
              label="Nombre de la colleccion"
              value={values.name}
              onChange={handleChange}
            />
            <TextField
              id="data"
              fullWidth
              autoFocus
              label="Data json"
              value={values.data}
              onChange={handleChange}
              multiline
              rows={25}
            />
          </Grid>
          <Grid container justifyContent={"center"} marginTop={2}>
            <Button variant="contained" type="submit" disabled={isLoading}>
              Enviar
            </Button>
          </Grid>
        </Box>
      </Card>
    </Grid>
  );
};

export default Tools;
