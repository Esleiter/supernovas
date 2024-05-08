import { ThemeProvider } from "@emotion/react";
import { AppBar, Toolbar, Typography, createTheme } from "@mui/material";

function appBarLabel(label: string) {
  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

const Header = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary">
        {appBarLabel("Supernovas")}
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
