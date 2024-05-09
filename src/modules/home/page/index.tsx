import { Grid, styled } from "@mui/material";
import Header from "../Header";
import { useOutlet } from "react-router-dom";

const PrincipalWrapper = styled("div")(() => ({
  width: "100%",
  minHeight: "100vh",
}));

const OutletWrapper = styled("div")(() => ({
  width: "100%"
}));

const Layout = () => {
  const outlet = useOutlet();
  return (
    <PrincipalWrapper>
      <Grid container sx={{ width: "100vh" }}>
        <Grid item width={"100%"} marginBottom={2}>
          <Header />
        </Grid>
        <OutletWrapper>{outlet}</OutletWrapper>
      </Grid>
    </PrincipalWrapper>
  );
};

export default Layout;
