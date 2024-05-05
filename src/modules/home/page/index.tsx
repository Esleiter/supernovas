import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";

const Home = () => {
  const { handleSubmit, handleChange, values } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
      },
      //   validationSchema: loginSchema,
      onSubmit: async ({ name, description }) => {
        console.log(name, description);
      },
    });
  return (
    <Card variant="outlined" style={{ width: 750 }}>
      <Box component="form" padding={2} noValidate onSubmit={handleSubmit}>
        <Grid container gap={2}>
          <TextField
            id="name"
            fullWidth
            autoFocus
            label="Nombre del proyecto"
            value={values.name}
            onChange={handleChange}
          />
          <TextField
            id="description"
            fullWidth
            autoFocus
            label="Descripcion"
            value={values.description}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </Grid>
        <Grid container justifyContent={'center'} marginTop={2}>
          <Button variant="contained">Enviar</Button>
        </Grid>
      </Box>
    </Card>
  );
};

export default Home;
