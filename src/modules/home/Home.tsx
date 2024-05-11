import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { generateGemini } from "../../services/gemini";
import { useState } from "react";
import { ResponseIA } from "../interface/types";
import CardResult from "./CardResult";
import pdfToText from 'react-pdftotext'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseIA>();
  const [text, setText] = useState("")

  function extractText(event: any) {
    const file = event.target.files[0];
    pdfToText(file)
      .then((text: any) => {
        setText(text);
        console.log(text); // Esto imprimirá el texto extraído en la consola
      })
      .catch((error: any) => console.error(error, "Failed to extract text from pdf"));
  }

  const { handleSubmit, handleChange, values, setValues } = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    //   validationSchema: loginSchema,
    onSubmit: async ({ name, description }) => {
      setIsLoading(true);
      if (text) {
        // Si se ha extraído texto del PDF, agregamos esa información a la descripción
        description += "\n\n---Texto extraído del PDF---\n\n" + text;
        // Actualizamos los valores del formulario con la nueva descripción
        setValues({ name, description });
      }
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
            <input type="file" accept="application/pdf" onChange={extractText} />
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
