import { Grid } from "@mui/material";
import { useGetById } from "../../../services/useSaveData";
import { useParams } from "react-router-dom";

type Params = { id: string };
const Details = () => {
  const { id } = useParams<Params>();
  const { data } = useGetById('projects', id);
  console.log('resp', data)
  return (
    <>
      <Grid container></Grid>
    </>
  );
};

export default Details;
