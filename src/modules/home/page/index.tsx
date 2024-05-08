import { Grid } from "@mui/material";
import Header from "../Header";
import { useOutlet } from "react-router-dom";

const Layout = () => {
  const outlet = useOutlet();
  return (
    <Grid container sx={{ width: "100vh", height: "100vh" }}>
      <Grid item width={"100%"}>
        <Header />
      </Grid>
      <Grid>
        {outlet}
      </Grid>
    </Grid>
  );
};

export default Layout;
