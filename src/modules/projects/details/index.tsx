import { Button, Grid } from "@mui/material";
import { useGetById } from "../../../services/useSaveData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useGenerateMatch } from "../../../services/match";
import eliminarBackticksJSON from "../../../services/eliminateJson";

export type Match = {
  consultantId: string;
  score: string;
  justifyResume: string;
};

const respmatch = [
  {
    consultantId: "3eEJj7zrlIOz4SPznuDP",
    score: "70%",
    justifyResume:
      "El consultor tiene experiencia en proyectos similares, dentro del mismo rango de duración y presupuesto. Además, su CV muestra habilidades relevantes para el alcance del proyecto.",
  },
  {
    consultantId: "SgutFheiJIsN6BbiiXjW",
    score: "60%",
    justifyResume:
      "El consultor tiene experiencia en proyectos similares, pero de menor duración y presupuesto. Sin embargo, su CV muestra habilidades relevantes para el alcance del proyecto.",
  },
  {
    consultantId: "fN7qzGDub4Wrf1K7uiyr",
    score: "50%",
    justifyResume:
      "El consultor tiene experiencia en proyectos similares, pero de mayor duración y presupuesto. Además, su CV muestra algunas habilidades relevantes para el alcance del proyecto.",
  },
];

type Params = { id: string };
const Details = () => {
  const { id } = useParams<Params>();
  const { data } = useGetById("projects", id);
  const [result, setResult] = useState<Match[]>();
  // const [loading, setLoading] = useState(false);
  const { match } = useGenerateMatch(data[0]);

  useEffect(() => {
    // setLoading(true);
    const resp = async () => {
      const value = await match()
      const eliminarBackticks = eliminarBackticksJSON(value?.response.text());
      const response = JSON.parse(eliminarBackticks);
      // setLoading(false);
      setResult(response);
      //setResult(respmatch)
    };
    resp()
  }, []);

  return (
    <>
      {/* <Grid container item justifyContent={"center"}>
        <Button
          variant="contained"
          disabled={loading}
          onClick={ () => match()}
        >
          Generar match
        </Button>
      </Grid> */}
      <Grid container gap={2}>
        {result?.map((item) => (
          <ItemDetail match={item} key={item?.consultantId} />
        ))}
      </Grid>
    </>
  );
};

export default Details;
