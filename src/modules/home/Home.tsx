import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { generateGemini } from "../../services/gemini";
import { useState } from "react";
import { ResponseIA } from "../interface/types";
import CardResult from "./CardResult";
import { useGenerateMatch } from "../../services/match";

const Home = () => {
  const { data } = useGenerateMatch();
  console.log(data);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseIA>();
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    //   validationSchema: loginSchema,
    onSubmit: async ({ name, description }) => {
      console.log("resp", description);
      setIsLoading(true);
      const res = await generateGemini(name, description);
      console.log("resp", res);
      setResponse(res);
      setIsLoading(false);
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
          <Grid container justifyContent={"center"} marginTop={2}>
            <Button variant="contained" type="submit" disabled={isLoading}>
              Enviar
            </Button>
          </Grid>
        </Box>
      </Card>
      {response && (
        <Grid container marginTop={2} marginBottom={3}>
          <CardResult data={response}  />
        </Grid>
      )}
    </Grid>
  );
};

export default Home;
