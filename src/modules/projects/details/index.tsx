import { Grid } from "@mui/material";
import { useGetById } from "../../../services/useSaveData";
import { useParams } from "react-router-dom";
import { useGenerateMatch } from "../../../services/match";
import { useEffect } from "react";

type Params = { id: string };
const Details = () => {
  const { id } = useParams<Params>();
  const { data } = useGetById("projects", id);
  const { match } = useGenerateMatch(data[0]);

  useEffect(() => {
    const matchData = async () => {
      const resp = await match();
      console.log('match', resp.response.text())
    };
    matchData();
  }, []);

  return (
    <>
      <Grid container></Grid>
    </>
  );
};

export default Details;
