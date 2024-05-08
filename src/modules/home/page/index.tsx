import { Grid, styled } from "@mui/material";
import Header from "../Header";
import { useOutlet } from "react-router-dom";

const PrincipalWrapper = styled("div")(() => ({
  width: "100%",
  minHeight: "100vh",
}));

const Layout = () => {
  const outlet = useOutlet();
  return (
    <PrincipalWrapper>
      <Grid container sx={{ width: "100vh" }}>
        <Grid item width={"100%"} marginBottom={2}>
          <Header />
        </Grid>
        <Grid>{outlet}</Grid>
      </Grid>
    </PrincipalWrapper>
  );
};

export default Layout;
